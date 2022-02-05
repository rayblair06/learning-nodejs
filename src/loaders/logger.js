import { createLogger, format, transports } from 'winston';


const formatted_date = (new Date())
    .toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
    .replaceAll('/', '-');

export const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.File({ filename: `logs/${formatted_date}.log` })],
    exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
    rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })]
});
