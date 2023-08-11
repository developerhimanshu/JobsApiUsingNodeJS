require("dotenv").config();
require("express-async-errors");

//Extra Security packages

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authentication = require("./middleware/authentication");

//routers
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", authRoute);

//Here we are passing authentication middleware so that these routes can be accessed by only the registered users.
app.use("/api/v1/jobs", authentication, jobRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
