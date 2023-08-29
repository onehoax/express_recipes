import * as t from "../types.js";

class CustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

function handleError(err: CustomError, req: t.Req, res: t.Res, next: t.Next) {
    console.log(req.url);
    console.log(next.length);

    if (!err.statusCode) err.statusCode = 500;

    res.status(err.statusCode).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.message
    });
}

export { CustomError, handleError };
