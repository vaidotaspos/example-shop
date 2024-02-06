const APIError = require('./apiError/ApiError');

const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  // patikrinti ar atejo APIError
  if (errorGot instanceof APIError) {
    return res.status(errorGot.status).json({
      error: errorGot.message,
    });
  }

  if (errorGot?.code === 'ER_DUP_ENTRY') {
    // email jau egzistuoja
    return res.status(400).json({
      error: 'email already taken',
    });
  }

  res.status(500).json({
    error: 'System errror',
  });
};

const validateItemBody = async (req, res, next) => {};

const validateToken = async (req, res, next) => {};

module.exports = {
  mainErrroHandler,
  validateToken,
  validateItemBody,
};
