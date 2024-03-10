import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}

export class NotFoundError extends CustomError {
    constructor(message) {
        super(message ?? 'Not Found');
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export class BadRequestError extends CustomError {
    constructor(message) {
        super(message ?? 'Please Provide All Data');
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}