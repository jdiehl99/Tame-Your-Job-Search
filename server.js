const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash    = require('connect-flash');

const app = express();
// const PORT = process.env.PORT || 3000;

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// grab the file that has the routes and logic
require('./public/js/jobs.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(process.env.PORT || 3000, function() {
    console.log("app listening on PORT ");
});