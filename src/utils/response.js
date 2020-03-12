const successResponse = (res, response) => {
  return res.status(response.status).json({
    message: response.message,
    results: response.results
  });
};

const failureResponse = (res, error) => {
  return res.status(error.status).json({
    error: error.message
  });
};

module.exports = { successResponse, failureResponse };
