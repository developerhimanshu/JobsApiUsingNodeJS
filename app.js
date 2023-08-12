require("dotenv").config();
require("express-async-errors");

//Extra Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

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

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    mas: 100,
  })
);

app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

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
