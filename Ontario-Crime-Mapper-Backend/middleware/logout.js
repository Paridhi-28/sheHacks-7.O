
const handleLogout = (req, res) => {
  // Check if token exists
  if (req.cookies?.refresh_jwt) {
    // Verify Token
    res.clearCookie("refresh_jwt", {
      httpOnly: true,
      sameSite: "None",
      withCredentials: true,
      credentials: "include",
      secure: true,
    }); // secure true

    // res.clearCookie("name", {
    //   httpOnly: true,
    //   sameSite: "None",
    //   withCredentials: true,
    //   credentials: "include",
    //   secure: true,
    // }); // secure true
    res.status(200).json({ message: "Logout Success" });
  } else {
    res.status(204).json({ message: "Logout Success - No Content" });
  }
};

module.exports = { handleLogout };
