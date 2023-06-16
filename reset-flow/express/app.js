var createError = require("http-errors");
var express = require("express");
var dotenv = require("dotenv");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var session = require("express-session");
var flash = require("express-flash");
dotenv.config();

// WebCrypto Polyfill for NodeJS
const { Crypto } = require("@peculiar/webcrypto");
globalThis.crypto = new Crypto();

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var accountRouter = require("./routes/account");
const { createClient } = require("./lib/supabase");

var app = express();

var sessionStore = new session.MemoryStore();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);
app.use(flash());

async function hasSession(req, res, next) {
  const nonSecurePaths = [
    "/auth/signin",
    "/auth/signup",
    "/auth/forgotpassword",
    "/auth/callback",
  ];
  if (nonSecurePaths.includes(req.path)) return next();

  //authenticate user
  const supabase = createClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.redirect("/auth/signin");
  }

  res.locals.session = session;

  next();
}

app.use("/", hasSession, indexRouter);
app.use("/account", hasSession, accountRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
