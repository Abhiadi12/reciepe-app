const createResponse = (
  success = true,
  message,
  data = null,
  errors = null
) => {
  return {
    success,
    message,
    data,
    errors,
  };
};

module.exports = createResponse;
