import { writeFile } from 'fs';
import { argv } from 'yargs';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

let logLevel = "1";
if(!isProd){
  logLevel = "NgxLoggerLevel.DEBUG";
}

const configPath = `./src/assets/configdata/appconfig.json`;
let configFile=`{}`;
if(!isProd){
configFile = `{
"APP_KEYCLOAK_URL":"${process.env.APP_KEYCLOAK_URL}",
"APP_KEYCLOAK_REALM":"${process.env.APP_KEYCLOAK_REALM}",
"APP_KEYCLOAK_CLIENT_ID":"${process.env.APP_KEYCLOAK_CLIENT_ID}",
"APP_CAMUNDA_ROOT_URL":"${process.env.APP_CAMUNDA_ROOT_URL}",
"APP_FORMIO_ROOT_URL":"${process.env.APP_FORMIO_ROOT_URL}"
}
`
}

const targetPath = `./src/environments/environment.${environment}.ts`;
const envConfigFile = `
import {  NgxLoggerLevel } from 'ngx-logger';
let LOGGER_CONFIG = {
    level: ${logLevel},
    serverLogLevel: NgxLoggerLevel.OFF
};
export const environment = {
  production: ${isProd},
  loggerConfig:LOGGER_CONFIG
};
`

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`ENV-Output generated at ${targetPath}`);
});

writeFile(configPath, configFile, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Config-File generated at ${configPath}`);
});
