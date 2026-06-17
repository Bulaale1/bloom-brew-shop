const errorHandler = (err, req, res, next) => {
  const timestamp = new Date().toLocaleString();

  // Log the error details internally for the developer to look at
  console.error(`[${timestamp}] ❌ Critical Backend Error:`, err.stack || err.message || err);

  // Send a clean, professional payload to the customer without exposing your code stack traces
  res.status(err.status || 500).json({
    error: 'An internal server error occurred. Please try your request again later.'
  });
};

module.exports = errorHandler;