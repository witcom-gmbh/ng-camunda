
import {  NgxLoggerLevel } from 'ngx-logger';
let LOGGER_CONFIG = {
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.OFF
};
export const environment = {
  production: false,
  loggerConfig:LOGGER_CONFIG
};
