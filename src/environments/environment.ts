import { LogLevelEnum } from "src/app/components/modules/logger/log-level.enum";

export const environment = {
    production: false,
    urlAPI: 'http://localhost:8008/api/',
    baseUrl: "",
    detailedLog: true,
    logLevel: LogLevelEnum.LOG.level
};
