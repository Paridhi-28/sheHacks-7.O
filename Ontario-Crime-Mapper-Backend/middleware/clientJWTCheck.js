const jwt = require("jsonwebtoken");

const clientJWTChecker = (req, res) => {
  // Check if token exists
  // console.log(req)
  const Token = req.headers.cookies;
  if (Token) {
    // Get Token
    // const Tokensplit = Token.split(" ")[1];
    // Verify Token
    jwt.verify(Token, process.env.REFRESHTOKENPASSWORD, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        req._id = decoded._id;
        req.name = decoded.name;
        res.status(200).send({ message: "Authorized", name: `${decoded.name}` });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = clientJWTChecker;
