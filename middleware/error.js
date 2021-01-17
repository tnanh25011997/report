const ErrorResponse = require("../utils/errorResponse");

const errHandler = (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message;
    console.log(err);

    //Mongo bad objectID
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ErrorResponse(message, 404);
    }
    //Mongo duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value`;
        error = new ErrorResponse(message, 400);
    }
    //Mongoose validation
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errHandler;