const { verifyToken } = require('../utils/jwt');

const authenticate = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Please login to our website' })
  }

  const decoded = await verifyToken(token);
  console.log(decoded)
  decoded.email = req.user;
  
  next();
}

module.exports = authenticate;