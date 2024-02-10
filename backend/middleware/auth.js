const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // eslint-disable-next-line prefer-destructuring
    const userId = decodedToken.userId;
    req.auth = {
      // eslint-disable-next-line object-shorthand
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
