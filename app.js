//heroku mongo dbs requires:
require(“dotenv”).config();

const express                 = require("express");
const path                    = require("path");
const logger         = require("morgan");
const cookieParser   = require("cookie-parser");
const bodyParser     = require("body-parser");
const app            = express();
const bcrypt         = require('bcrypt');

//routes connection over here
const customerAuthRoutes = require("./routes/customer-auth-routes");
const customers          = require('./routes/customers');
const index              = require('./routes/index');
const vendors            = require('./routes/vendors');
const orders             = require('./routes/orders');

const vendorAuthRoutes = require("./routes/vendor-auth-routes");

// sessions connection over here
const session        = require("express-session");
const customerData   = require('connect-mongo') (session);
const vendorData     = require('connect-mongo') (session);


// Controllers

// Mongoose configuration
const mongoose       = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

// Middlewares configuration
app.use(logger("dev"));

app.use(session ({
  secret: "basic-auth-secret",
  cookie: { maxAge: 100000 }, //s6 minutes
  store: new customerData({
    mongooseConnection: mongoose.connection,
  ttl: 24 * 60 * 60
  })
}));

app.use(session ({
  secret: "basic-auth-secret",
  cookie: { maxAge: 100000 }, //s6 minutes
  store: new vendorData({
    mongooseConnection: mongoose.connection,
  ttl: 24 * 60 * 60
  })
}));

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Access POST params with body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
app.use(cookieParser());

// Routes
app.use('/', index);
app.use('/', vendorAuthRoutes);
app.use('/', customerAuthRoutes);
app.use('/vendors', vendors);
app.use('/customers', customers);
app.use('/orders', orders);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
