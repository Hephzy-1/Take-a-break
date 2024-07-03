// errorHandler.js
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);

  let statusCode = err.status || 500;
  let errorResponse = err.message || 'Internal Server Error';

  res.status(statusCode).json({ message: errorResponse});
};