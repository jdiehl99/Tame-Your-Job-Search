const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
var connection = require("./../../config/connection.js");

function showPage(app, __dirname) {

    // Show index page
    app.get("/", function (req, res) {
            res.render("index");
    });

    // Get list of job from db and send to dashboard template
    app.get("/dashboard", function (req, res) {
        connection.query("SELECT * FROM jobs;", function (err, data) {
            if (err) { throw err; }
            console.log("data from jobs.js",data);
            res.render("dashboard", { jobs: data });
        });
    });

    // Add a new job to the list
    app.post("/job/new", function (req, res) {
        // pick a random number from 1-20 to associate with image
        var job = req.body;
        console.log("job from jobs.js line 23",job);
        // connection.query('INSERT INTO jobs (jobtitle) VALUES ("'+job.jobtitle+'")', function (err, result) {
        //     if (err) { throw err; }
        //     res.redirect("/");
        // });
    });


}
module.exports = showPage;