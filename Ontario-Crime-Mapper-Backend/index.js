const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

// Importing cors
  const cors = require('cors');
  const corsOptions = require('./config/corsOptions');

  app.use(cors(corsOptions));

//Importing Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const verifyJWT = require("./middleware/verifyJWT");
const clientJWTCheck = require("./routes/verifyTokenRoute");
const refresh = require("./routes/refresh");
const logoutRoute = require("./routes/logoutRoute");
const DataManageRoute = require("./routes/dataManageRoute");
// const refreshTokenRoute = require("./routes/refreshToken");

//connect to db
mongoose
  .connect(
    process.env.MONGODB_LINK
  )
  .then(() => console.log("Connected to db"))
  .catch((error) => {
    console.log(error);
  });

mongoose.connection.on("error", (err) => {
  console.log(err);
});

//Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/home", (req, res) => {
  res.send("Hello World!");
});
//Route Middleware
app.use("/api/User", authRoute);
app.use("/api/refresh", refresh);
app.use("/api/logout", logoutRoute);
app.use("/api/verifyToken", clientJWTCheck);

//Verified Routes
app.use(verifyJWT.verifyJWT);
app.use('/api/post', postRoute);
app.use("/api/data", DataManageRoute);


app.listen(process.env.PORT, () =>
  console.log(`Server is running on Port: ${process.env.PORT}`)
);
