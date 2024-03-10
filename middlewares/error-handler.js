import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const error = {
        Error: err.message || "Internal Server Error",
    };
    res.status(statusCode).json(error);
};
export default errorHandler;