<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\DAV\CalDAV;

use OCP\App\IAppManager;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\Calendar\IManager;
use OCP\IURLGenerator;
use OCP\IUserManager;
use function array_map;

class UpcomingEventsService {
	public function __construct(private IManager $calendarManager,
		private ITimeFactory $timeFactory,
		private IUserManager $userManager,
		private IAppManager $appManager,
		private IURLGenerator $urlGenerator) {
	}

	public function getEvents(string $userId, string $location = null): array {
		// TODO: move logic into a service class
		$searchQuery = $this->calendarManager->newQuery('principals/users/' . $userId);
		if ($location !== null) {
			$searchQuery->addSearchProperty('LOCATION');
			$searchQuery->setSearchPattern($location);
		}
		$searchQuery->addType('VEVENT');
		$searchQuery->setLimit(5);
		$now = $this->timeFactory->now();
		$searchQuery->setTimerangeStart($now->modify('-1 minute'));
		$searchQuery->setTimerangeEnd($now->modify('+7 days'));

		$events = $this->calendarManager->searchForPrincipal($searchQuery);
		$calendarAppEnabled = $this->appManager->isEnabledForUser(
			'calendar',
			$this->userManager->get($userId),
		);

		return array_map(fn (array $event) => new UpcomingEvent(
			$event['uri'],
			$event['objects'][0]['RECURRENCE-ID'][0]?->getTimeStamp() ?? null,
			$event['calendar-uri'],
			$event['objects'][0]['DTSTART'][0]?->getTimestamp(),
	$event['objects'][0]['SUMMARY'][0] ?? null,
	$event['objects'][0]['LOCATION'][0] ?? null,
			match ($calendarAppEnabled) {
				// TODO: create a named, deep route in calendar
				// TODO: it's a code smell to just assume this route exists, find an abstraction
				true => $this->urlGenerator->linkToRouteAbsolute('calendar.view.index'),
				false => null,
			},
		), $events);
	}

}
