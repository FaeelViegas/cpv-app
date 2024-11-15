import { Injectable } from "@angular/core";
import { LogLevelEnum } from "./log-level.enum";
import { environment } from "src/environments/environment";

const originalConsole = console;

@Injectable({
    providedIn: 'root' 
  })
export class LoggerService {

    private static _instance: LoggerService | undefined;

    public get level(): number {
        return environment.logLevel;
    }

    private constructor() {
        this.disableDefaultConsole();
    }

    public static instance(): LoggerService {
        if (!this._instance) {
            this._instance = new LoggerService();
        }

        return this._instance;
    }

    private disableDefaultConsole(): void {
        console = {
            log: (message?: any, ...optionalParams: any[]) => {
                if(LogLevelEnum.LOG.level < environment.logLevel) {
                    return;
                }

                originalConsole.log(message, ...optionalParams);
                originalConsole.warn("Don't use console.log, use the LoggerService.");
            }, debug: (message?: any, ...optionalParams: any[]) => {
                if(LogLevelEnum.DEBUG.level < environment.logLevel) {
                    return;
                }

                originalConsole.debug(message, ...optionalParams);
                originalConsole.warn("Don't use console.debug, use the LoggerService.");
            }, info: (message?: any, ...optionalParams: any[]) => {
                if(LogLevelEnum.INFO.level < environment.logLevel) {
                    return;
                }

                originalConsole.info(message, ...optionalParams);
                originalConsole.warn("Don't use console.info, use the LoggerService.");
            }, warn: (message?: any, ...optionalParams: any[]) => {
                if(LogLevelEnum.WARN.level < environment.logLevel) {
                    return;
                }

                originalConsole.warn(message, ...optionalParams);
                originalConsole.warn("Don't use console.warn, use the LoggerService.");
            }, error: (message?: any, ...optionalParams: any[]) => {
                if(LogLevelEnum.ERROR.level < environment.logLevel) {
                    return;
                }
                
                originalConsole.error(message, ...optionalParams);
                originalConsole.warn("Don't use console.error, use the LoggerService.");
            }
        } as any;
    }

    public log(message?: any, ...optionalParams: any[]) {
        if(LogLevelEnum.LOG.level < environment.logLevel) {
            return;
        }

        originalConsole.log(message, ...optionalParams);
    }

    public debug(message?: any, ...optionalParams: any[]) {
        if(LogLevelEnum.DEBUG.level < environment.logLevel) {
            return;
        }

        originalConsole.debug(message, ...optionalParams);
    }

    public info(message?: any, ...optionalParams: any[]) {
        if(LogLevelEnum.INFO.level < environment.logLevel) {
            return;
        }

        originalConsole.info(message, ...optionalParams);
    }

    public trace(message?: any, ...optionalParams: any[]) {
        if(LogLevelEnum.TRACE.level < environment.logLevel) {
            return;
        }

        originalConsole.trace(message, ...optionalParams);
    }

    public warn(message?: any, ...optionalParams: any[]) {
        if(LogLevelEnum.WARN.level < environment.logLevel) {
            return;
        }

        originalConsole.warn(message, ...optionalParams);
    }

    public error(message?: any, ...optionalParams: any[]) {
        if(LogLevelEnum.ERROR.level < environment.logLevel) {
            return;
        }

        originalConsole.error(message, ...optionalParams);
    }

}