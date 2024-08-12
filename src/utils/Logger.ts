/** custom LOGGER class which outputs to the browser console,
 * inspired by https://www.meticulous.ai/blog/getting-started-with-react-logging
 */
/* eslint-disable no-console */
import { LogLevel } from "@types";

type LogFn = (message?: unknown, ...optionalParams: unknown[]) => void;

interface Logger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
}

const NO_OP: LogFn = (_message?: unknown, ..._optionalParams: unknown[]) => {};

export class ConsoleLogger implements Logger {
    readonly debug: LogFn;
    readonly info: LogFn;
    readonly warn: LogFn;
    readonly error: LogFn;

    constructor(logLevel: LogLevel = LogLevel.WARN) {
        this.error = console.error.bind(console);
        if (logLevel === LogLevel.ERROR) {
            this.warn = NO_OP;
            this.info = NO_OP;
            this.debug = NO_OP;
            return;
        }

        this.warn = console.warn.bind(console);
        if (logLevel === LogLevel.WARN) {
            this.info = NO_OP;
            this.debug = NO_OP;
            return;
        }

        this.info = console.info.bind(console);
        if (logLevel === LogLevel.INFO) {
            this.debug = NO_OP;
            return;
        }

        this.debug = console.debug.bind(console);
    }
}

export const LOGGER: Logger = new ConsoleLogger(
    import.meta.env.MODE === "development" ? LogLevel.DEBUG : LogLevel.WARN
);

export default LOGGER;
