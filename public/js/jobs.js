const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
var connection = require("./../../config/connection.js");

function showPage(app, __dirname) {

    // Show index page
    app
        .get("/", function (req, res) {
            res.render("index");
        });

    // Get list of job from db and send to dashboard template
    app.get("/dashboard", function (req, res) {
        connection
            .query("SELECT * FROM jobs;", function (err, data) {
                if (err) {
                    throw err;
                }
                res.render("dashboard", {jobs: data});
            });
    });

    // show form to add job to DB
    app.get("/addjob", function (req, res) {
        res.render("addjob");
    });

    // Add a new job to the list
    app.post("/job/new", function (req, res) {
        // pick a random number from 1-20 to associate with image
        var job = req.body;
        // console.log("job from jobs.js line 23", job);
        console.log("job title",job.jobtitle);
        connection.query('INSERT INTO jobs (jobtitle,company,contact,phone,email,webpage,source,method) VALUES ("'+job.jobtitle+'","'+job.company+'","'+job.conact+'","'+job.phone+'","'+job.email+'","'+job.webpage+'","'+job.source+'","'+job.method+'")', function (err, result) {     
            if (err) { console.log(err); }     
        });
        res.redirect("/dashboard");
    });

        // Get selected job from DB
        app.get("/job/:id", function (req, res) {
            var jobid = req.params.id;
            console.log("jobid",jobid);
            connection
                .query("SELECT * FROM jobs where id = "+jobid+";", function (err, data) {
                    if (err) {
                        throw err;
                    }
                    console.log("job data",data);
                    res.render("detail", {jobs: data});
                });
        });
    

}
module.exports = showPage;