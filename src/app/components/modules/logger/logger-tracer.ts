import { environment } from "src/environments/environment";
import { LogLevelEnum } from "./log-level.enum";
import { LoggerService } from "./logger.service"
import { StringBuilder } from "src/app/util/string-builder";

export function trace() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let realMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (LogLevelEnum.TRACE.level < environment.logLevel) {
                return realMethod.apply(this, args);
            }

            if (!realMethod.apply) {
                return realMethod.apply(this, args);
            }

            let time = new Date().toISOString();
            let trace = environment.detailedLog ? LoggerService.instance().trace : LoggerService.instance().info;

            let messageBuilder: StringBuilder = StringBuilder.init(`[${time}]`)
                .append(" - invoking method ")
                .append(propertyKey);

            if (target.constructor?.ɵcmp?.debugInfo?.className) {
                messageBuilder
                    .append(" from ")
                    .append(target.constructor?.ɵcmp?.debugInfo?.className)
            }

            trace(messageBuilder.build());
            return realMethod.apply(this, args);
        }
    }
}