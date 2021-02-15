const createError = require("http-errors");
const express = require("express");
const cors = require('cors');
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const passport = require('passport');

// Connect to MongoDB
connectDB();

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");

const { json, urlencoded } = express;

const app = express();

require('./config/passport')(passport);

app.use(cors());

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/articles", articleRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
