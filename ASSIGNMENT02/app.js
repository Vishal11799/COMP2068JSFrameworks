var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var hbs = require("hbs");

// Configs
var config = require("./configs/globals");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var homeRouter = require("./routes/home");
var projectsRouter = require("./routes/projects");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Register a helper function to format dates
hbs.registerHelper("formatDate", function (date) {
  return new Date(date).toLocaleDateString(); // Formats as 'MM/DD/YYYY'
});

hbs.registerHelper("formatDateForInput", function (date) {
  return new Date(date).toISOString().split("T")[0]; // Formats as 'YYYY-MM-DD' for input field
});

// Register the 'eq' helper for comparison
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes setup
app.use("/projects", projectsRouter);

app.use("/", loginRouter);
app.use("/register", registerRouter);
app.use("/home", homeRouter); // Add this line

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://creditcardadmin:TAJSUPpXS8RvlVyK@cluster0.zklhwz3.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that page doesn't exist.");
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
