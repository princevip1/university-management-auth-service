import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';


// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const data = new Date(timestamp).toISOString().split('T')[0];
    const time = new Date(timestamp).toISOString().split('T')[1].split('.')[0];
    return `[${data} ${time}] [${label}] ${level}: ${message}`;
});


const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'PR' }),
        timestamp(),
        myFormat,
        // prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', `succeses`, 'phu-%DATE%-success.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});
const errorLogger = createLogger({
    level: 'error',
    format: combine(
        label({ label: 'PR' }),
        timestamp(),
        myFormat,
        // prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', `errors`, 'phu-%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});

export { logger, errorLogger };