export class LogLevelEnum {

    public static readonly DISABLED = new LogLevelEnum(999, "");
    public static readonly ERROR = new LogLevelEnum(99, "error");
    public static readonly WARN = new LogLevelEnum(89, "warn");
    public static readonly DEBUG = new LogLevelEnum(79, "debug");
    public static readonly LOG = new LogLevelEnum(69, "log");
    public static readonly INFO = new LogLevelEnum(59, "info");
    public static readonly TRACE = new LogLevelEnum(0, "trace");

    constructor(private _level: number, private _code: string) { }

    public get level(): number {
        return this._level;
    }

    public get code(): string {
        return this._code;
    }

    public static values(): LogLevelEnum[] {
        return [
            LogLevelEnum.ERROR,
            LogLevelEnum.WARN,
            LogLevelEnum.DEBUG,
            LogLevelEnum.LOG,
            LogLevelEnum.INFO,
            LogLevelEnum.TRACE
        ]
    }

    public static fromCode(code: string | undefined): LogLevelEnum | null {
        switch (code) {
            case LogLevelEnum.ERROR.code:
                return LogLevelEnum.ERROR;
            case LogLevelEnum.WARN.code:
                return LogLevelEnum.WARN;
            case LogLevelEnum.DEBUG.code:
                return LogLevelEnum.DEBUG;
            case LogLevelEnum.LOG.code:
                return LogLevelEnum.LOG;
            case LogLevelEnum.INFO.code:
                return LogLevelEnum.INFO;
            case LogLevelEnum.TRACE.code:
                return LogLevelEnum.TRACE;
            default:
                return null;
        }
    }
}