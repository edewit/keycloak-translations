#!/usr/bin/env node
import properties from "properties-parser";
import _ from "lodash"

import common from "./common-messages.js";
import help from "./common-help.js";
import dashboard from "./dashboard/messages.js";
import clients from "./clients/messages.js";
import clientsHelp from "./clients/help.js";
import clientScopes from "./client-scopes/messages.js";
import clientScopesHelp from "./client-scopes/help.js";
import groups from "./groups/messages.js";
import realm from "./realm/messages.js";
import roles from "./realm-roles/messages.js";
import users from "./user/messages.js";
import usersHelp from "./user/help.js";
import sessions from "./sessions/messages.js";
import events from "./events/messages.js";
import realmSettings from "./realm-settings/messages.js";
import realmSettingsHelp from "./realm-settings/help.js";
import authentication from "./authentication/messages.js";
import authenticationHelp from "./authentication/help.js";
import userFederation from "./user-federation/messages.js";
import userFederationHelp from "./user-federation/help.js";
import identityProviders from "./identity-providers/messages.js";
import identityProvidersHelp from "./identity-providers/help.js";

import dynamicLabels from "./components/dynamic/labels.js";

import fs from 'fs';

const adminMessages = properties.read('admin-messages_en.properties');
const adminMessageKeys = Object.keys(adminMessages);

const newUI = {
  ...common,
  ...help,
  ...dashboard,
  ...clients,
  ...clientsHelp,
  ...clientScopes,
  ...clientScopesHelp,
  ...groups,
  ...realm,
  ...roles,
  ...groups,
  ...users,
  ...usersHelp,
  ...sessions,
  ...userFederation,
  ...events,
  ...realmSettings,
  ...realmSettingsHelp,
  ...authentication,
  ...authenticationHelp,
  ...identityProviders,
  ...identityProvidersHelp,
  ...userFederation,
  ...userFederationHelp,
  ...dynamicLabels,
};

const namespaces = [
  "common",
  "common-help",
  "dashboard",
  "clients",
  "clients-help",
  "client-scopes",
  "client-scopes-help",
  "groups",
  "realm",
  "roles",
  "users",
  "users-help",
  "sessions",
  "events",
  "realm-settings",
  "realm-settings-help",
  "authentication",
  "authentication-help",
  "user-federation",
  "user-federation-help",
  "identity-providers",
  "identity-providers-help",
  "dynamic",
];

const flattenObj = (ob) => {
  let result = {};
  for (const i in ob) {
    if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j].toLowerCase();
      }
    } else {
      result[i] = ob[i].toLowerCase();
    }
  }
  return result;
};

const adminMessageValueLookup = {};
for (const key of adminMessageKeys) {
  const adminMessageValue = adminMessages[key].toLowerCase();
  adminMessageValueLookup[adminMessageValue] = key;
}
const adminMessageValueLookupKeys = Object.keys(adminMessageValueLookup);

const supportedLocales = [
  "ca",
  "de",
  "es",
  "fr",
  "it",
  "ja",
  "lt",
  "lv",
  "nl",
  "no",
  "pl",
  "pt_BR",
  "ru",
  "zh_CN"
];

const save = (locale, namespace, result) => {
  try {
    const path = `./result/${locale}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(`./result/${locale}`);
    }
    fs.writeFileSync(`./result/${locale}/${namespace}.json`, JSON.stringify(result, undefined, 2));
  } catch (err) {
    console.error(err)
  }
}

for (const namespace of Object.keys(newUI)) {
  save("en", namespace, newUI[namespace]);
}

for (const locale of supportedLocales) {
  const localMessages = properties.read(`./admin-messages_${locale}.properties`);

  for (const namespace of namespaces) {
    const result = {};
    const flat = flattenObj(newUI[namespace]);
    const table = _.invertBy(flat);
    const lookup = Object.keys(table);
    for (let index = 0; index < lookup.length; index++) {
      const key = lookup[index];
      const oldKey = adminMessageValueLookup[adminMessageValueLookupKeys.find(e => e === key)];
      const translated = localMessages[oldKey];
      if (oldKey && translated) {
        _.set(result, table[key][0], translated);
      }
    }

    save(locale, namespace, result)
  }
}
