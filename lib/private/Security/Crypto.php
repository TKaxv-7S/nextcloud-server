<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2016-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-FileCopyrightText: 2016 ownCloud, Inc.
 * SPDX-License-Identifier: AGPL-3.0-only
 */
namespace OC\Security;

use Exception;
use OCP\IConfig;
use OCP\Security\ICrypto;
use phpseclib\Crypt\AES;
use phpseclib\Crypt\Hash;

/**
 * Class Crypto provides a high-level encryption layer using AES-CBC. If no key has been provided
 * it will use the secret defined in config.php as key. Additionally the message will be HMAC'd.
 *
 * Usage:
 * $encryptWithDefaultPassword = \OC::$server->getCrypto()->encrypt('EncryptedText');
 * $encryptWithCustompassword = \OC::$server->getCrypto()->encrypt('EncryptedText', 'password');
 *
 * @package OC\Security
 */
class Crypto implements ICrypto {
	private AES $cipher;
	private int $ivLength = 16;

	public function __construct(
		private IConfig $config,
	) {
		$this->cipher = new AES();
	}

	/**
	 * @param string $message The message to authenticate
	 * @param string $password Password to use (defaults to `secret` in config.php)
	 * @return string Calculated HMAC
	 */
	public function calculateHMAC(string $message, string $password = ''): string {
		if ($password === '') {
			$password = $this->config->getSystemValueString('secret');
		}

		// Append an "a" behind the password and hash it to prevent reusing the same password as for encryption
		$password = hash('sha512', $password . 'a');

		$hash = new Hash('sha512');
		$hash->setKey($password);
		return $hash->hash($message);
	}

	/**
	 * Encrypts a value and adds an HMAC (Encrypt-Then-MAC)
	 *
	 * @param string $password Password to encrypt, if not specified the secret from config.php will be taken
	 * @return string Authenticated ciphertext
	 * @throws Exception if it was not possible to gather sufficient entropy
	 * @throws Exception if encrypting the data failed
	 */
	public function encrypt(string $plaintext, string $password = ''): string {
		if ($password === '') {
			$password = $this->config->getSystemValueString('secret');
		}
		$keyMaterial = hash_hkdf('sha512', $password);
		$this->cipher->setPassword(substr($keyMaterial, 0, 32));

		$iv = \random_bytes($this->ivLength);
		$this->cipher->setIV($iv);

		/** @var string|false $encrypted */
		$encrypted = $this->cipher->encrypt($plaintext);
		if ($encrypted === false) {
			throw new Exception('Encrypting failed.');
		}

		$ciphertext = bin2hex($encrypted);
		$iv = bin2hex($iv);
		$hmac = bin2hex($this->calculateHMAC($ciphertext.$iv, substr($keyMaterial, 32)));

		return $ciphertext.'|'.$iv.'|'.$hmac.'|3';
	}

	/**
	 * Decrypts a value and verifies the HMAC (Encrypt-Then-Mac)
	 * @param string $password Password to encrypt, if not specified the secret from config.php will be taken
	 * @throws Exception If the HMAC does not match
	 * @throws Exception If the decryption failed
	 */
	public function decrypt(string $authenticatedCiphertext, string $password = ''): string {
		$secret = $this->config->getSystemValue('secret');
		try {
			if ($password === '') {
				return $this->decryptWithoutSecret($authenticatedCiphertext, $secret);
			}
			return $this->decryptWithoutSecret($authenticatedCiphertext, $password);
		} catch (Exception $e) {
			// If password is empty and the current secret didn't work, attempt with an empty secret as a fallback 
			// for instances where the secret might not have been set for a time *IF* the ciphertext version 
			// indicates an empty secret is a possibility. For example, it's pointless (and will fail hard if tried)
			// to try the fallback with v3 versioned ciphertext since the keying material can't be empty with that version.
			// SO: Only attempt the fallback on older versions (including non-versioned) ciphertexts
			if ($password === '') {
				// Determine the crypto version, if any
				$parts = explode('|', $authenticatedCiphertext);
				$partCount = \count($parts);
				if ($partCount < 3 || $partCount > 4) {
					throw new Exception('Authenticated ciphertext could not be decoded (invalid format).');
				}
				if ($partCount === 4) { // only newer ciphertext has a version field
					$version = $parts[3];
				}
				
				if ((!empty($version) && $version <= '2') || empty($version)) { // only <3 versioned or old non-versioned ciphertext ever supported empty secrets
					return $this->decryptWithoutSecret($authenticatedCiphertext, '');
				}
			}
			throw $e;
		}
	}

	private function decryptWithoutSecret(string $authenticatedCiphertext, string $password = ''): string {
		$hmacKey = $encryptionKey = $password;

		$parts = explode('|', $authenticatedCiphertext);
		$partCount = \count($parts);

		$ciphertext = $this->hex2bin($parts[0]);
		$iv = $parts[1];
		$hmac = $this->hex2bin($parts[2]);

		if ($partCount === 4) {
			$version = $parts[3];
			if ($version >= '2') {
				$iv = $this->hex2bin($iv);
			}

			if ($version === '3') {
				$keyMaterial = hash_hkdf('sha512', $password);
				$encryptionKey = substr($keyMaterial, 0, 32);
				$hmacKey = substr($keyMaterial, 32);
			}
		}
		$this->cipher->setPassword($encryptionKey);
		$this->cipher->setIV($iv);

		if (!hash_equals($this->calculateHMAC($parts[0] . $parts[1], $hmacKey), $hmac)) {
			throw new Exception('HMAC does not match.');
		}

		$result = $this->cipher->decrypt($ciphertext);
		if ($result === false) {
			throw new Exception('Decryption failed');
		}

		return $result;
	}

	private function hex2bin(string $hex): string {
		if (!ctype_xdigit($hex)) {
			throw new \RuntimeException('String contains non hex chars: ' . $hex);
		}
		if (strlen($hex) % 2 !== 0) {
			throw new \RuntimeException('Hex string is not of even length: ' . $hex);
		}
		$result = hex2bin($hex);

		if ($result === false) {
			throw new \RuntimeException('Hex to bin conversion failed: ' . $hex);
		}

		return $result;
	}
}
