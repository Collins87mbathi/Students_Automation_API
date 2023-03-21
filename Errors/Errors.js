const ApiError = (status, message) => ({
  status,
  message,
  InternalError: (message) => ApiError(500, message),
  NotFound: (message) => ApiError(404, message),
  BadRequest: (message) => ApiError(400, message),
  UnAuthorized: (message) => ApiError(403, message),
  Required: (message) => ApiError(402, message),
});

module.exports = {ApiError}
