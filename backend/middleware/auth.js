const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(1);
    console.log(req.headers.authorization.split(' ')[1]);
    console.log(2);
    console.log(req.headers.authorization);
    console.log(3);
    console.log(req.headers);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // eslint-disable-next-line prefer-destructuring
    const userId = decodedToken.userId;
    req.auth = {
      // eslint-disable-next-line object-shorthand
      userId: userId,
    };
    console.log(4);
    console.log(req.auth);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
