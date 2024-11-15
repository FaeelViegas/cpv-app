import { LogLevelEnum } from "src/app/components/modules/logger/log-level.enum";

export const environment = {
    production: false,
    //localhost
    // urlAPI: 'http://localhost:8008/api/',
    //casa
    urlAPI: 'http://192.168.0.39:8008/api/',
    //faculdade
    // urlAPI: 'http://localhost:8008/api/',
    baseUrl: "",
    detailedLog: true,
    logLevel: LogLevelEnum.LOG.level
};
