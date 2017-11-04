const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 4100;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// grab the file that has the routes and logic
var routes = require("./public/js/jobs.js");
routes(app, __dirname);


app.listen(PORT, function() {
    console.log("app listening on PORT " + PORT);
});