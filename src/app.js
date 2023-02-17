// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const chalk = require("chalk");

// require - router
const authRoute = require("./routes/auth-route");

// require - middleware
const notFoundMiddleWare = require("./middlewares/not-found");
const errorMiddleWare = require("./middlewares/error");

const app = express();

// middleware
app.use(cors()); // to connect with front-end through web browser
app.use(helmet()); // to protect http
app.use(morgan("dev")); // to log request
app.use(express.json()); // to get BODY data

// router
app.use("/auth", authRoute);

// middleware error
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

// start port
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.yellowBright.italic.bold(`Start server at port ${port}...`))
);
