const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function authenticateToken(req, res, next) {
  // const token = req.header('Authorization')
const token = req.header('Authorization').replace('Bearer ', '');
console.log(req.header+'p1pp')
console.log(token+'ppp')
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized err' });
  }

  

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('fail sellauth')
      return res.status(403).json({ message: 'Forbidden err' });
    }
    console.log('success sell')
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
