import winston, { format } from 'winston'
import path from 'path'


class MyLogger {
    protected logger: winston.Logger;
    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.prettyPrint(),
                winston.format.timestamp(),
                winston.format.cli(),
            ),
            transports: [
                new winston.transports.File({ filename: path.join(__dirname, './log/error.log'), level: 'error' }),
            ],
        })
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    info(message: string, callback?: winston.LogCallback): void {
        this.logger.info(message, callback)
    }
    error(message: string, callback?: winston.LogCallback): void {
        this.logger.error(message, callback)
    }
    warn(message: string, callback?: winston.LogCallback): void {
        this.logger.warn(message, callback)
    }
}

const logger = new MyLogger();

export default logger