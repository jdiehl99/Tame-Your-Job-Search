const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");

const app = express();
var connection = require("./../../config/connection.js");

module.exports = function (app, passport) {

    // Show index page
    app
        .get("/", function (req, res) {
            res.render("index");
        });

    // Get list of job from db and send to dashboard template
    app.get("/dashboard", isLoggedIn, function (req, res) {
        // get id of current user and display their jobs
        var uid = req.user.id;
        connection.query("SELECT * FROM jobs where userID = " + uid + ";", function (err, data) {
            if (err) {
                throw err;
            }
            res.render("dashboard", {jobs: data});
        });
    });

    // show form to add job to DB
    app.get("/addjob", isLoggedIn, function (req, res) {
        res.render("addjob");
    });

    // Add a new job to the list
    app.post("/job/new", isLoggedIn, function (req, res) {
        // get the values from the form
        var job = req.body;
        // grab the id of the current user
        var uid = req.user.id;

        // insert new job into DB
        connection.query('INSERT INTO jobs (jobtitle,company,contact,phone,email,webpage,source,method,use' +
                'rID) VALUES ("' + job.jobtitle + '","' + job.company + '","' + job.conact + '","' + job.phone + '","' + job.email + '","' + job.webpage + '","' + job.source + '","' + job.method + '","' + uid + '")', function (err, result) {
            if (err) {
                console.log(err);
            }
        });
        res.redirect("/dashboard");
    });

    // Add activity to job listing
    app.post("/job/activity", isLoggedIn, function (req, res) {
        console.log("job activity route hit");
        console.log(req.body);
        // get the values from the form
        var act = req.body;

        // // insert new activity into table
        connection.query('INSERT INTO activity (jobID,activity,activityDate) VALUES ("' + act.jobID + '","' + act.activity + '","' + act.activityDate + '")', function (err, result) {
            if (err) {
                console.log(err);
            }
        });
        res.redirect("/job/" + req.body.jobID + "");
    });

    // Get selected job from DB
    app.get("/job/:id", isLoggedIn, function (req, res) {
        // get the job ID from the row that was clicked
        var jobid = req.params.id;
        // grab the id of the current user
        var uid = req.user.id;
        connection.query("SELECT * FROM jobs where id = " + jobid + " and userID = " + uid + ";", function (err, data) {
            if (err) {
                throw err;
            }
            connection
                .query('SELECT DATE_FORMAT(activityDate, "%m/%d/%Y") as actDate,activity FROM activity where jobID = "' + jobid + '" ORDER BY activityDate;', function (err2, data2) {
                    if (err) {
                        throw err;
                    }
                    res.render("detail", {
                        jobs: data,
                        activity: data2
                    });

                });
        });
    });

    // show the login page
    app.get('/login', function (req, res) {
        res.render('login');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }), function (req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });

    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // route middleware to make sure
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) 
            return next();
        
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}