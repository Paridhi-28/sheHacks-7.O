const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // Check if token exists
  // console.log(req.body)
  const Token = req.cookies.refresh_jwt || req.headers.cookies || req.body.refresh_jwt;
  // console.log(Token);
  if (Token) {
    // Get Token
    // const Tokensplit = Token.split(" ")[1];
    // Verify Token
    jwt.verify(Token, process.env.REFRESHTOKENPASSWORD, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        req._id = decoded._id;
        req.email = decoded.email;
        // console.log(req._id);
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { verifyJWT };
