const getActualRequestDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const serviceLogger = (req, res, next) => {
    const current_datetime = new Date();
    const formatted_date =
        `${current_datetime.getDate()
        }-${
            current_datetime.getMonth() + 1
        }-${
            current_datetime.getFullYear()
        } ${
            current_datetime.getHours()
        }:${
            current_datetime.getMinutes()
        }:${
            current_datetime.getSeconds()}`;

    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);

    console.log(`[${formatted_date}] [${method}] ${url} (${status}) - ${durationInMilliseconds.toLocaleString()} ms`);

    next();
};

export const errorLogger = (err, req, res, next) => {
    console.error(err);
    next(err);
};

export const errorResponder = (err, req, res, next) => {
    return res.status(err.status_code).send(err);
};
