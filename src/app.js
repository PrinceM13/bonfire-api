// const { sequelize } = require("./models");
// sequelize.sync({ alter: true });

require("dotenv").config();

// setting cors for socket.io
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"]
};

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: corsOptions });

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const chalk = require("chalk");

// require - router
const authRoute = require("./routes/auth-route");

// require - middleware
const notFoundMiddleWare = require("./middlewares/not-found");
const errorMiddleWare = require("./middlewares/error");

// middleware
app.use(cors()); // to connect with front-end through web browser
app.use(helmet()); // to protect http
app.use(morgan("dev")); // to log request
app.use(express.json()); // to get BODY data

// router
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/events", eventRoute);

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);
    io.emit("message", data);
  });
});

// middleware error
app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

// start port
const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log(chalk.yellowBright.italic.bold(`Start server at port ${port}...`))
);
