const errorHandler = (err,req,res,next) => {
console.log(err.stack);
 const statusCode = err.status || 500; // Default to 500 if not set
 const message = err.error.message || "Internal Server Error";

 res.status(statusCode).json({ error: message });

}

module.exports = errorHandler;