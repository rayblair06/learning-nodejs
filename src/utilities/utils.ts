import { ValidationError } from '../exceptions/errors';


const mapSchemaErrors = (schemaErrors) => {
    return schemaErrors.map(({ path, message }) => {
        return { path, message };
    });
};

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            throw new ValidationError(mapSchemaErrors(error.details));
        }

        next();
    };
};
