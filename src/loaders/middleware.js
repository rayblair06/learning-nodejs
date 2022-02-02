import { StatusCodes } from 'http-status-codes';
import { createLogger, format, transports } from 'winston';


const date = new Date();
const formatted_date = date
    .toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
    .replaceAll('/', '-');

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: `logs/${formatted_date}.log` })],
    exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })]
});

const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const serviceLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);

    logger.info(`[${method}] ${url} (${status}) - ${durationInMilliseconds.toLocaleString()} ms`);

    next();
};

export const errorLogger = (err, req, res, next) => {
    logger.error(err);
    next(err);
};

export const errorResponder = (err, req, res, next) => {
    if (!err.status_code) {
        logger.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong');
    }

    return res.status(err.status_code).send(err);
};

export const unhandledRejection = (reason, promise) => {
    logger.error(reason, 'Unhandled Rejection at Promise', promise);
};

export const uncaughtException = (error) => {
    logger.error(`${(new Date()).toUTCString()  } uncaughtException:`, error.message);
    logger.error(error.stack);
    process.exit(1);
};
