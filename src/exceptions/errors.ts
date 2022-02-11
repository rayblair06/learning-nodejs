class ResponseError extends Error {
}

class ValidationError extends ResponseError {
}

class UserNotFoundError extends ResponseError {
}

class GroupNotFoundError extends ResponseError {
}

class TokenExpiredError extends ResponseError {
}

export {
    TokenExpiredError,
    ResponseError,
    ValidationError,
    UserNotFoundError,
    GroupNotFoundError
};
