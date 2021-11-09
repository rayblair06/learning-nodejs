class ResponseError extends Error {
    constructor(errors) {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 500;
        this.errors = errors;
    }
}

class ValidationError extends ResponseError {
    constructor(errors) {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 400;
        this.errors = errors;
    }
}

class UserNotFoundError extends ResponseError {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 404;
        this.errors = {
            'message' : 'User Not Found'
        };
    }
}

module.exports = {
    ResponseError,
    ValidationError,
    UserNotFoundError
};
