<?php

// autoload_classmap.php @generated by Composer

$vendorDir = dirname(__DIR__);
$baseDir = $vendorDir;

return array(
    'Composer\\InstalledVersions' => $vendorDir . '/composer/InstalledVersions.php',
    'OCA\\User_LDAP\\Access' => $baseDir . '/../lib/Access.php',
    'OCA\\User_LDAP\\AccessFactory' => $baseDir . '/../lib/AccessFactory.php',
    'OCA\\User_LDAP\\AppInfo\\Application' => $baseDir . '/../lib/AppInfo/Application.php',
    'OCA\\User_LDAP\\BackendUtility' => $baseDir . '/../lib/BackendUtility.php',
    'OCA\\User_LDAP\\Command\\CheckGroup' => $baseDir . '/../lib/Command/CheckGroup.php',
    'OCA\\User_LDAP\\Command\\CheckUser' => $baseDir . '/../lib/Command/CheckUser.php',
    'OCA\\User_LDAP\\Command\\CreateEmptyConfig' => $baseDir . '/../lib/Command/CreateEmptyConfig.php',
    'OCA\\User_LDAP\\Command\\DeleteConfig' => $baseDir . '/../lib/Command/DeleteConfig.php',
    'OCA\\User_LDAP\\Command\\PromoteGroup' => $baseDir . '/../lib/Command/PromoteGroup.php',
    'OCA\\User_LDAP\\Command\\ResetGroup' => $baseDir . '/../lib/Command/ResetGroup.php',
    'OCA\\User_LDAP\\Command\\ResetUser' => $baseDir . '/../lib/Command/ResetUser.php',
    'OCA\\User_LDAP\\Command\\Search' => $baseDir . '/../lib/Command/Search.php',
    'OCA\\User_LDAP\\Command\\SetConfig' => $baseDir . '/../lib/Command/SetConfig.php',
    'OCA\\User_LDAP\\Command\\ShowConfig' => $baseDir . '/../lib/Command/ShowConfig.php',
    'OCA\\User_LDAP\\Command\\ShowRemnants' => $baseDir . '/../lib/Command/ShowRemnants.php',
    'OCA\\User_LDAP\\Command\\TestConfig' => $baseDir . '/../lib/Command/TestConfig.php',
    'OCA\\User_LDAP\\Command\\UpdateUUID' => $baseDir . '/../lib/Command/UpdateUUID.php',
    'OCA\\User_LDAP\\Configuration' => $baseDir . '/../lib/Configuration.php',
    'OCA\\User_LDAP\\Connection' => $baseDir . '/../lib/Connection.php',
    'OCA\\User_LDAP\\ConnectionFactory' => $baseDir . '/../lib/ConnectionFactory.php',
    'OCA\\User_LDAP\\Controller\\ConfigAPIController' => $baseDir . '/../lib/Controller/ConfigAPIController.php',
    'OCA\\User_LDAP\\Controller\\RenewPasswordController' => $baseDir . '/../lib/Controller/RenewPasswordController.php',
    'OCA\\User_LDAP\\DataCollector\\LdapDataCollector' => $baseDir . '/../lib/DataCollector/LdapDataCollector.php',
    'OCA\\User_LDAP\\Db\\GroupMembership' => $baseDir . '/../lib/Db/GroupMembership.php',
    'OCA\\User_LDAP\\Db\\GroupMembershipMapper' => $baseDir . '/../lib/Db/GroupMembershipMapper.php',
    'OCA\\User_LDAP\\Events\\GroupBackendRegistered' => $baseDir . '/../lib/Events/GroupBackendRegistered.php',
    'OCA\\User_LDAP\\Events\\UserBackendRegistered' => $baseDir . '/../lib/Events/UserBackendRegistered.php',
    'OCA\\User_LDAP\\Exceptions\\AttributeNotSet' => $baseDir . '/../lib/Exceptions/AttributeNotSet.php',
    'OCA\\User_LDAP\\Exceptions\\ConstraintViolationException' => $baseDir . '/../lib/Exceptions/ConstraintViolationException.php',
    'OCA\\User_LDAP\\Exceptions\\NoMoreResults' => $baseDir . '/../lib/Exceptions/NoMoreResults.php',
    'OCA\\User_LDAP\\Exceptions\\NotOnLDAP' => $baseDir . '/../lib/Exceptions/NotOnLDAP.php',
    'OCA\\User_LDAP\\FilesystemHelper' => $baseDir . '/../lib/FilesystemHelper.php',
    'OCA\\User_LDAP\\GroupPluginManager' => $baseDir . '/../lib/GroupPluginManager.php',
    'OCA\\User_LDAP\\Group_LDAP' => $baseDir . '/../lib/Group_LDAP.php',
    'OCA\\User_LDAP\\Group_Proxy' => $baseDir . '/../lib/Group_Proxy.php',
    'OCA\\User_LDAP\\Handler\\ExtStorageConfigHandler' => $baseDir . '/../lib/Handler/ExtStorageConfigHandler.php',
    'OCA\\User_LDAP\\Helper' => $baseDir . '/../lib/Helper.php',
    'OCA\\User_LDAP\\IGroupLDAP' => $baseDir . '/../lib/IGroupLDAP.php',
    'OCA\\User_LDAP\\ILDAPGroupPlugin' => $baseDir . '/../lib/ILDAPGroupPlugin.php',
    'OCA\\User_LDAP\\ILDAPUserPlugin' => $baseDir . '/../lib/ILDAPUserPlugin.php',
    'OCA\\User_LDAP\\ILDAPWrapper' => $baseDir . '/../lib/ILDAPWrapper.php',
    'OCA\\User_LDAP\\IUserLDAP' => $baseDir . '/../lib/IUserLDAP.php',
    'OCA\\User_LDAP\\Jobs\\CleanUp' => $baseDir . '/../lib/Jobs/CleanUp.php',
    'OCA\\User_LDAP\\Jobs\\Sync' => $baseDir . '/../lib/Jobs/Sync.php',
    'OCA\\User_LDAP\\Jobs\\UpdateGroups' => $baseDir . '/../lib/Jobs/UpdateGroups.php',
    'OCA\\User_LDAP\\LDAP' => $baseDir . '/../lib/LDAP.php',
    'OCA\\User_LDAP\\LDAPProvider' => $baseDir . '/../lib/LDAPProvider.php',
    'OCA\\User_LDAP\\LDAPProviderFactory' => $baseDir . '/../lib/LDAPProviderFactory.php',
    'OCA\\User_LDAP\\LDAPUtility' => $baseDir . '/../lib/LDAPUtility.php',
    'OCA\\User_LDAP\\LoginListener' => $baseDir . '/../lib/LoginListener.php',
    'OCA\\User_LDAP\\Mapping\\AbstractMapping' => $baseDir . '/../lib/Mapping/AbstractMapping.php',
    'OCA\\User_LDAP\\Mapping\\GroupMapping' => $baseDir . '/../lib/Mapping/GroupMapping.php',
    'OCA\\User_LDAP\\Mapping\\UserMapping' => $baseDir . '/../lib/Mapping/UserMapping.php',
    'OCA\\User_LDAP\\Migration\\GroupMappingMigration' => $baseDir . '/../lib/Migration/GroupMappingMigration.php',
    'OCA\\User_LDAP\\Migration\\RearrangeMarkRemnantsAsDisabled' => $baseDir . '/../lib/Migration/RearrangeMarkRemnantsAsDisabled.php',
    'OCA\\User_LDAP\\Migration\\RemoveRefreshTime' => $baseDir . '/../lib/Migration/RemoveRefreshTime.php',
    'OCA\\User_LDAP\\Migration\\SetDefaultProvider' => $baseDir . '/../lib/Migration/SetDefaultProvider.php',
    'OCA\\User_LDAP\\Migration\\UUIDFix' => $baseDir . '/../lib/Migration/UUIDFix.php',
    'OCA\\User_LDAP\\Migration\\UUIDFixGroup' => $baseDir . '/../lib/Migration/UUIDFixGroup.php',
    'OCA\\User_LDAP\\Migration\\UUIDFixInsert' => $baseDir . '/../lib/Migration/UUIDFixInsert.php',
    'OCA\\User_LDAP\\Migration\\UUIDFixUser' => $baseDir . '/../lib/Migration/UUIDFixUser.php',
    'OCA\\User_LDAP\\Migration\\UnsetDefaultProvider' => $baseDir . '/../lib/Migration/UnsetDefaultProvider.php',
    'OCA\\User_LDAP\\Migration\\Version1010Date20200630192842' => $baseDir . '/../lib/Migration/Version1010Date20200630192842.php',
    'OCA\\User_LDAP\\Migration\\Version1120Date20210917155206' => $baseDir . '/../lib/Migration/Version1120Date20210917155206.php',
    'OCA\\User_LDAP\\Migration\\Version1130Date20211102154716' => $baseDir . '/../lib/Migration/Version1130Date20211102154716.php',
    'OCA\\User_LDAP\\Migration\\Version1130Date20220110154717' => $baseDir . '/../lib/Migration/Version1130Date20220110154717.php',
    'OCA\\User_LDAP\\Migration\\Version1130Date20220110154718' => $baseDir . '/../lib/Migration/Version1130Date20220110154718.php',
    'OCA\\User_LDAP\\Migration\\Version1130Date20220110154719' => $baseDir . '/../lib/Migration/Version1130Date20220110154719.php',
    'OCA\\User_LDAP\\Migration\\Version1141Date20220323143801' => $baseDir . '/../lib/Migration/Version1141Date20220323143801.php',
    'OCA\\User_LDAP\\Migration\\Version1190Date20230706134108' => $baseDir . '/../lib/Migration/Version1190Date20230706134108.php',
    'OCA\\User_LDAP\\Migration\\Version1190Date20230706134109' => $baseDir . '/../lib/Migration/Version1190Date20230706134109.php',
    'OCA\\User_LDAP\\Notification\\Notifier' => $baseDir . '/../lib/Notification/Notifier.php',
    'OCA\\User_LDAP\\PagedResults\\TLinkId' => $baseDir . '/../lib/PagedResults/TLinkId.php',
    'OCA\\User_LDAP\\Proxy' => $baseDir . '/../lib/Proxy.php',
    'OCA\\User_LDAP\\Service\\BirthdateParserService' => $baseDir . '/../lib/Service/BirthdateParserService.php',
    'OCA\\User_LDAP\\Service\\UpdateGroupsService' => $baseDir . '/../lib/Service/UpdateGroupsService.php',
    'OCA\\User_LDAP\\Settings\\Admin' => $baseDir . '/../lib/Settings/Admin.php',
    'OCA\\User_LDAP\\Settings\\AppSettings' => $baseDir . '/../lib/Settings/AppSettings.php',
    'OCA\\User_LDAP\\Settings\\Section' => $baseDir . '/../lib/Settings/Section.php',
    'OCA\\User_LDAP\\SetupChecks\\LdapConnection' => $baseDir . '/../lib/SetupChecks/LdapConnection.php',
    'OCA\\User_LDAP\\SetupChecks\\LdapInvalidUuids' => $baseDir . '/../lib/SetupChecks/LdapInvalidUuids.php',
    'OCA\\User_LDAP\\UserPluginManager' => $baseDir . '/../lib/UserPluginManager.php',
    'OCA\\User_LDAP\\User\\DeletedUsersIndex' => $baseDir . '/../lib/User/DeletedUsersIndex.php',
    'OCA\\User_LDAP\\User\\Manager' => $baseDir . '/../lib/User/Manager.php',
    'OCA\\User_LDAP\\User\\OfflineUser' => $baseDir . '/../lib/User/OfflineUser.php',
    'OCA\\User_LDAP\\User\\User' => $baseDir . '/../lib/User/User.php',
    'OCA\\User_LDAP\\User_LDAP' => $baseDir . '/../lib/User_LDAP.php',
    'OCA\\User_LDAP\\User_Proxy' => $baseDir . '/../lib/User_Proxy.php',
    'OCA\\User_LDAP\\Wizard' => $baseDir . '/../lib/Wizard.php',
    'OCA\\User_LDAP\\WizardResult' => $baseDir . '/../lib/WizardResult.php',
);
