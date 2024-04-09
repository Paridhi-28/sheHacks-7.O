const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.post("/register", async (req, res) => {
  console.log(req);
  const resEmail = req.body.email;
  const resPass = req.body.password;
  //Validate Data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(401).send(error.details[0].message);
  }

  //Check if user exists
  const emailExist = await User.findOne({ email: resEmail });
  if (emailExist) {
    return res.status(400).send("Email Already Exist");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(resPass, salt);

  //Create a New User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ User: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req)
  const resEmail = req.body.email;
  const resPass = req.body.password;
  const { error } = loginValidation(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({
    email: resEmail,
  });
  if (!user) {
    return res.status(400).send(`Email: ${resEmail} does not exist`);
  }

  const validPass = await bcrypt.compare(resPass, user.password);

  if (!validPass) {
    // console.log("error in pass");
    return res.status(401).send({ msg: "Invalid credential" });
  }

  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.TOKENPASSWORD,
    {
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.REFRESHTOKENPASSWORD,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("refresh_jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    credentials: "include",
  });

  return res
    .header("auth-token", accessToken)
    .json({ accessToken, refreshToken });
});

module.exports = router;
