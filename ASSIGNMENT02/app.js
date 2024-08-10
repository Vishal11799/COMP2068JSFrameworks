var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var hbs = require("hbs");
var User = require("./models/ser");
// Configs
var globals = require("./configs/globals");
var indexRouter = require("./routes/index");
var homeRouter = require("./routes/home");

//import passport
var passport = require("passport");
var session = require("express-session");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/shared"));

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
//config
app.use(
  session({
    secret: "creditcardexpancetraker",
    resave: false,
    saveUninitialized: false,
  })
);
//start passport
app.use(passport.initialize());
app.use(passport.session());
//passport security
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes setup
// app.use("/projects", projectsRouter);
// app.use("/login", loginRouter);
// app.use("/register", registerRouter);
app.use("/home", homeRouter);
app.use("/", indexRouter);
// app.use("/projects", projectsRouter);

// Connect to MongoDB
mongoose
  .connect(globals.ConnectionString.MongoDB)
  .then(() => {
    console.log("Connected successfully to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Example middleware to set a variable for authenticated status



// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
