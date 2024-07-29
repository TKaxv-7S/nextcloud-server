<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\DAV\CalDAV\WebcalCaching;

use Exception;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use OCA\DAV\CalDAV\CalDavBackend;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\LocalServerException;
use OCP\IConfig;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Log\LoggerInterface;
use Sabre\DAV\Exception\BadRequest;
use Sabre\DAV\PropPatch;
use Sabre\DAV\Xml\Property\Href;
use Sabre\VObject\Component;
use Sabre\VObject\DateTimeParser;
use Sabre\VObject\InvalidDataException;
use Sabre\VObject\ParseException;
use Sabre\VObject\Reader;
use Sabre\VObject\Recur\NoInstancesException;
use Sabre\VObject\Splitter\ICalendar;
use Sabre\VObject\UUIDUtil;
use function count;

class RefreshWebcalService {

	private CalDavBackend $calDavBackend;

	private IClientService $clientService;

	private IConfig $config;

	/** @var LoggerInterface */
	private LoggerInterface $logger;

	public const REFRESH_RATE = '{http://apple.com/ns/ical/}refreshrate';
	public const STRIP_ALARMS = '{http://calendarserver.org/ns/}subscribed-strip-alarms';
	public const STRIP_ATTACHMENTS = '{http://calendarserver.org/ns/}subscribed-strip-attachments';
	public const STRIP_TODOS = '{http://calendarserver.org/ns/}subscribed-strip-todos';

	public function __construct(CalDavBackend $calDavBackend,
		IClientService $clientService,
		IConfig $config,
		LoggerInterface $logger,
		private ITimeFactory $time) {
		$this->calDavBackend = $calDavBackend;
		$this->clientService = $clientService;
		$this->config = $config;
		$this->logger = $logger;
	}

	public function refreshSubscription(string $principalUri, string $uri) {
		$subscription = $this->getSubscription($principalUri, $uri);
		$mutations = [];
		if (!$subscription) {
			return;
		}

		// Check the refresh rate if there is any
		if(!empty($subscription['{http://apple.com/ns/ical/}refreshrate'])) {
			// add the refresh interval to the lastmodified timestamp
			$updateTime = (new \DateTime($subscription['lastmodified']))->add($subscription['{http://apple.com/ns/ical/}refreshrate']);
			if($updateTime->getTimestamp() > $this->time->getTime()) {
				return;
			}
		}

		$webcalData = $this->queryWebcalFeed($subscription, $mutations);
		if (!$webcalData) {
			return;
		}

		$localData = $this->calDavBackend->getLimitedCalendarObjects($subscription['id'], CalDavBackend::CALENDAR_TYPE_SUBSCRIPTION);

		$stripTodos = ($subscription[self::STRIP_TODOS] ?? 1) === 1;
		$stripAlarms = ($subscription[self::STRIP_ALARMS] ?? 1) === 1;
		$stripAttachments = ($subscription[self::STRIP_ATTACHMENTS] ?? 1) === 1;

		try {
			$splitter = new ICalendar($webcalData, Reader::OPTION_FORGIVING);

			while ($vObject = $splitter->getNext()) {
				/** @var Component $vObject */
				$compName = null;
				$uid = null;

				foreach ($vObject->getComponents() as $component) {
					if ($component->name === 'VTIMEZONE') {
						continue;
					}

					$compName = $component->name;

					if ($stripAlarms) {
						unset($component->{'VALARM'});
					}
					if ($stripAttachments) {
						unset($component->{'ATTACH'});
					}

					$uid = $component->{ 'UID' }->getValue();
				}

				if ($stripTodos && $compName === 'VTODO') {
					continue;
				}

				if (!isset($uid)) {
					continue;
				}

				$denormalized = $this->calDavBackend->getDenormalizedData($vObject->serialize());
				// Find all identical sets and remove them from the update
				if (isset($localData[$uid]) && $denormalized['etag'] === $localData[$uid]['etag']) {
					unset($localData[$uid]);
					continue;
				}

				$vObjectCopy = clone $vObject;
				$identical = isset($localData[$uid]) && $this->compareWithoutDtstamp($vObjectCopy, $localData[$uid]);
				if ($identical) {
					unset($localData[$uid]);
					continue;
				}

				// Find all modified sets and update them
				if (isset($localData[$uid]) && $denormalized['etag'] !== $localData[$uid]['etag']) {
					$this->calDavBackend->updateCalendarObject($subscription['id'], $localData[$uid]['uri'], $vObject->serialize(), CalDavBackend::CALENDAR_TYPE_SUBSCRIPTION);
					unset($localData[$uid]);
					continue;
				}

				// Only entirely new events get created here
				try {
					$objectUri = $this->getRandomCalendarObjectUri();
					$this->calDavBackend->createCalendarObject($subscription['id'], $objectUri, $vObject->serialize(), CalDavBackend::CALENDAR_TYPE_SUBSCRIPTION);
				} catch (NoInstancesException | BadRequest $ex) {
					$this->logger->error('Unable to create calendar object from subscription {subscriptionId}', ['exception' => $ex, 'subscriptionId' => $subscription['id'], 'source' => $subscription['source']]);
				}
			}

			$ids = array_map(static function ($dataSet): int {
				return (int) $dataSet['id'];
			}, $localData);
			$uris = array_map(static function ($dataSet): string {
				return $dataSet['uri'];
			}, $localData);

			if(!empty($ids) && !empty($uris)) {
				// Clean up on aisle 5
				// The only events left over in the $localData array should be those that don't exist upstream
				// All deleted VObjects from upstream are removed
				$this->calDavBackend->purgeCachedEventsForSubscription($subscription['id'], $ids, $uris);
			}

			$newRefreshRate = $this->checkWebcalDataForRefreshRate($subscription, $webcalData);
			if ($newRefreshRate) {
				$mutations[self::REFRESH_RATE] = $newRefreshRate;
			}

			$this->updateSubscription($subscription, $mutations);
		} catch (ParseException $ex) {
			$this->logger->error("Subscription {subscriptionId} could not be refreshed due to a parsing error", ['exception' => $ex, 'subscriptionId' => $subscription['id']]);
		}
	}

	/**
	 * loads subscription from backend
	 */
	public function getSubscription(string $principalUri, string $uri): ?array {
		$subscriptions = array_values(array_filter(
			$this->calDavBackend->getSubscriptionsForUser($principalUri),
			function ($sub) use ($uri) {
				return $sub['uri'] === $uri;
			}
		));

		if (count($subscriptions) === 0) {
			return null;
		}

		return $subscriptions[0];
	}

	/**
	 * gets webcal feed from remote server
	 */
	private function queryWebcalFeed(array $subscription, array &$mutations): ?string {
		$client = $this->clientService->newClient();

		$didBreak301Chain = false;
		$latestLocation = null;

		$handlerStack = HandlerStack::create();
		$handlerStack->push(Middleware::mapRequest(function (RequestInterface $request) {
			return $request
				->withHeader('Accept', 'text/calendar, application/calendar+json, application/calendar+xml')
				->withHeader('User-Agent', 'Nextcloud Webcal Service');
		}));
		$handlerStack->push(Middleware::mapResponse(function (ResponseInterface $response) use (&$didBreak301Chain, &$latestLocation) {
			if (!$didBreak301Chain) {
				if ($response->getStatusCode() !== 301) {
					$didBreak301Chain = true;
				} else {
					$latestLocation = $response->getHeader('Location');
				}
			}
			return $response;
		}));

		$allowLocalAccess = $this->config->getAppValue('dav', 'webcalAllowLocalAccess', 'no');
		$subscriptionId = $subscription['id'];
		$url = $this->cleanURL($subscription['source']);
		if ($url === null) {
			return null;
		}

		try {
			$params = [
				'allow_redirects' => [
					'redirects' => 10
				],
				'handler' => $handlerStack,
				'nextcloud' => [
					'allow_local_address' => $allowLocalAccess === 'yes',
				]
			];

			$user = parse_url($subscription['source'], PHP_URL_USER);
			$pass = parse_url($subscription['source'], PHP_URL_PASS);
			if ($user !== null && $pass !== null) {
				$params['auth'] = [$user, $pass];
			}

			$response = $client->get($url, $params);
			$body = $response->getBody();

			if ($latestLocation) {
				$mutations['{http://calendarserver.org/ns/}source'] = new Href($latestLocation);
			}

			$contentType = $response->getHeader('Content-Type');
			$contentType = explode(';', $contentType, 2)[0];
			switch ($contentType) {
				case 'application/calendar+json':
					try {
						$jCalendar = Reader::readJson($body, Reader::OPTION_FORGIVING);
					} catch (Exception $ex) {
						// In case of a parsing error return null
						$this->logger->warning("Subscription $subscriptionId could not be parsed", ['exception' => $ex]);
						return null;
					}
					return $jCalendar->serialize();

				case 'application/calendar+xml':
					try {
						$xCalendar = Reader::readXML($body);
					} catch (Exception $ex) {
						// In case of a parsing error return null
						$this->logger->warning("Subscription $subscriptionId could not be parsed", ['exception' => $ex]);
						return null;
					}
					return $xCalendar->serialize();

				case 'text/calendar':
				default:
					try {
						$vCalendar = Reader::read($body);
					} catch (Exception $ex) {
						// In case of a parsing error return null
						$this->logger->warning("Subscription $subscriptionId could not be parsed", ['exception' => $ex]);
						return null;
					}
					return $vCalendar->serialize();
			}
		} catch (LocalServerException $ex) {
			$this->logger->warning("Subscription $subscriptionId was not refreshed because it violates local access rules", [
				'exception' => $ex,
			]);

			return null;
		} catch (Exception $ex) {
			$this->logger->warning("Subscription $subscriptionId could not be refreshed due to a network error", [
				'exception' => $ex,
			]);

			return null;
		}
	}

	/**
	 * check if:
	 *  - current subscription stores a refreshrate
	 *  - the webcal feed suggests a refreshrate
	 *  - return suggested refreshrate if user didn't set a custom one
	 *
	 */
	private function checkWebcalDataForRefreshRate(array $subscription, string $webcalData): ?string {
		// if there is no refreshrate stored in the database, check the webcal feed
		// whether it suggests any refresh rate and store that in the database
		if (isset($subscription[self::REFRESH_RATE]) && $subscription[self::REFRESH_RATE] !== null) {
			return null;
		}

		/** @var Component\VCalendar $vCalendar */
		$vCalendar = Reader::read($webcalData);

		$newRefreshRate = null;
		if (isset($vCalendar->{'X-PUBLISHED-TTL'})) {
			$newRefreshRate = $vCalendar->{'X-PUBLISHED-TTL'}->getValue();
		}
		if (isset($vCalendar->{'REFRESH-INTERVAL'})) {
			$newRefreshRate = $vCalendar->{'REFRESH-INTERVAL'}->getValue();
		}

		if (!$newRefreshRate) {
			return null;
		}

		// check if new refresh rate is even valid
		try {
			DateTimeParser::parseDuration($newRefreshRate);
		} catch (InvalidDataException $ex) {
			return null;
		}

		return $newRefreshRate;
	}

	/**
	 * update subscription stored in database
	 * used to set:
	 *  - refreshrate
	 *  - source
	 *
	 * @param array $subscription
	 * @param array $mutations
	 */
	private function updateSubscription(array $subscription, array $mutations) {
		if (empty($mutations)) {
			return;
		}

		$propPatch = new PropPatch($mutations);
		$this->calDavBackend->updateSubscription($subscription['id'], $propPatch);
		$propPatch->commit();
	}

	/**
	 * This method will strip authentication information and replace the
	 * 'webcal' or 'webcals' protocol scheme
	 *
	 * @param string $url
	 * @return string|null
	 */
	private function cleanURL(string $url): ?string {
		$parsed = parse_url($url);
		if ($parsed === false) {
			return null;
		}

		if (isset($parsed['scheme']) && $parsed['scheme'] === 'http') {
			$scheme = 'http';
		} else {
			$scheme = 'https';
		}

		$host = $parsed['host'] ?? '';
		$port = isset($parsed['port']) ? ':' . $parsed['port'] : '';
		$path = $parsed['path'] ?? '';
		$query = isset($parsed['query']) ? '?' . $parsed['query'] : '';
		$fragment = isset($parsed['fragment']) ? '#' . $parsed['fragment'] : '';

		$cleanURL = "$scheme://$host$port$path$query$fragment";
		// parse_url is giving some weird results if no url and no :// is given,
		// so let's test the url again
		$parsedClean = parse_url($cleanURL);
		if ($parsedClean === false || !isset($parsedClean['host'])) {
			return null;
		}

		return $cleanURL;
	}

	/**
	 * Returns a random uri for a calendar-object
	 *
	 * @return string
	 */
	public function getRandomCalendarObjectUri():string {
		return UUIDUtil::getUUID() . '.ics';
	}

	private function compareWithoutDtstamp(Component $vObject, array $calendarObject): bool {
		foreach ($vObject->getComponents() as $component) {
			unset($component->{'DTSTAMP'});
		}

		$localVobject = Reader::read($calendarObject['calendardata']);
		foreach ($localVobject->getComponents() as $component) {
			unset($component->{'DTSTAMP'});
		}

		return md5($localVobject->serialize()) === md5($vObject->serialize());
	}
}
