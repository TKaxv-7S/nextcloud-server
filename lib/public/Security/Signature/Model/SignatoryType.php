<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCP\Security\Signature\Model;

/**
 * type of link between local and remote instance
 *
 * - FORGIVABLE = the keypair can be deleted and refreshed anytime and silently
 * - REFRESHABLE = the keypair can be refreshed but a notice will be generated
 * - TRUSTED = any changes of keypair will require human interaction, warning will be issued
 * - STATIC = error will be issued on conflict,  assume keypair cannot be reset.
 *
 * @since 30.0.0
 */
enum SignatoryType: int {
	/** @since 30.0.0 */
	case FORGIVABLE = 1; // no notice on refresh
	/** @since 30.0.0 */
	case REFRESHABLE = 4; // notice on refresh
	/** @since 30.0.0 */
	case TRUSTED = 8; // warning on refresh
	/** @since 30.0.0 */
	case STATIC = 9; // error on refresh
}
