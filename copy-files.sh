#!/bin/bash

find ../keycloak/themes/src -name 'admin-messages_*.properties' -exec cp {} . \;

cp ../keycloak-admin/src/sessions/messages.ts ./sessions/messages.js
cp ../keycloak-admin/src/user/messages.ts ./user/messages.js
cp ../keycloak-admin/src/events/messages.ts ./events/messages.js
cp ../keycloak-admin/src/authentication/messages.ts ./authentication/messages.js
cp ../keycloak-admin/src/identity-providers/messages.ts ./identity-providers/messages.js
cp ../keycloak-admin/src/dashboard/messages.ts ./dashboard/messages.js
cp ../keycloak-admin/src/user-federation/messages.ts ./user-federation/messages.js
cp ../keycloak-admin/src/realm-settings/messages.ts ./realm-settings/messages.js
cp ../keycloak-admin/src/clients/messages.ts ./clients/messages.js
cp ../keycloak-admin/src/realm/messages.ts ./realm/messages.js
cp ../keycloak-admin/src/groups/messages.ts ./groups/messages.js
cp ../keycloak-admin/src/client-scopes/messages.ts ./client-scopes/messages.js
cp ../keycloak-admin/src/realm-roles/messages.ts ./realm-roles/messages.js
cp ../keycloak-admin/src/common-messages.ts ./common-messages.js
cp ../keycloak-admin/src/common-help.ts ./common-help.js

cp ../keycloak-admin/src/user/help.ts ./user/help.js
cp ../keycloak-admin/src/authentication/help.ts ./authentication/help.js
cp ../keycloak-admin/src/identity-providers/help.ts ./identity-providers/help.js
cp ../keycloak-admin/src/user-federation/help.ts ./user-federation/help.js
cp ../keycloak-admin/src/realm-settings/help.ts ./realm-settings/help.js
cp ../keycloak-admin/src/clients/help.ts ./clients/help.js
cp ../keycloak-admin/src/client-scopes/help.ts ./client-scopes/help.js
