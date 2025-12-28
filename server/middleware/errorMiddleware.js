export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const extraDetail = err.extraDetail || "Error from backend";

    return res.status(status).json({
        message,
        extraDetail
    });
};