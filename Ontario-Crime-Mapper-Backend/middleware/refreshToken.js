const jwt = require("jsonwebtoken");

const handleRefreshToken = (req, res) => {
  // Check if token exists
  if (req.cookies?.refresh_jwt) {
    // Get Token
    const refreshToken = req.cookies?.refresh_jwt;
    // Verify Token
    jwt.verify(
      refreshToken,
      process.env.REFRESHTOKENPASSWORD,
      (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          const newAccessToken = jwt.sign(
            { _id: decoded._id },
            process.env.TOKENPASSWORD,
            {
              expiresIn: "10m",
            }
          );
          return res.status(200).json({ newAccessToken });
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { handleRefreshToken };
