const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = require('../config/auth');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  req.userId = decodedToken.userId;
  next();
};