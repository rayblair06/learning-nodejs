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

class GroupNotFoundError extends ResponseError {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 404;
        this.errors = {
            'message' :  'Group Not Found'
        };
    }
}

class TokenExpiredError extends ResponseError {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.success = false;
        this.status_code = 401;
        this.errors = {
            'message' : 'Failed to authenticate token'
        };
    }
}

export {
    TokenExpiredError,
    ResponseError,
    ValidationError,
    UserNotFoundError,
    GroupNotFoundError
};
