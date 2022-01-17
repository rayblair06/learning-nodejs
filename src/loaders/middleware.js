export const errorLogger = (err, req, res, next) => {
    console.error(err);
    next(err);
};

export const errorResponder = (err, req, res) => {
    return res.status(err.status_code).send(err);
};
