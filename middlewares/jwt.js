const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../constants')


const GenerateToken =(email)=>{
  return jwt.sign({email},JWT_SECRET,{
      expiresIn:'1d'
  })
}

var Authentication = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);
  
  jwt.verify(token,JWT_SECRET, (err, decoded) => {
      if (err) {
          console.error('Error verifying token:', err);
          return res.sendStatus(401); // Send unauthorized status for invalid token
      }
      req.user = decoded; // Attach user information to request object
      next();
  });
};

const VerifyTokenHandler = (req,res)=>{
  const userDetails = req.user;
  res.status(200).json({
      success: true,
      message: 'Token verified successfully',
      user: userDetails
  });
}

module.exports = {GenerateToken,Authentication,VerifyTokenHandler}
