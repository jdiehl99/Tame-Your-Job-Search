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
            res.render("index.ejs", {
                message: req.flash('loginMessage')
            });
        });

    // Show user dashboard
    app.get("/dashboard", isLoggedIn, function (req, res) {
        // get id of current user and display stats
        var uid = req.user.id;
        connection.query("SELECT COUNT(id) as totaljobs FROM jobs where userID = '" + uid + "';", function (err, data) {
            if (err) {
                throw err;
            }
            connection.query('SELECT COUNT(id) as setinterviews FROM activity where userID = "' + uid + '" and activity LIKE "%Interview Scheduled";', function (err2, data2) {
                if (err2) {
                    throw err2;
                }
                connection.query('SELECT COUNT(id) as totalinterviews FROM activity where userID = "' + uid + '" and activity LIKE "%Intervew Completed";', function (err3, data3) {
                    if (err3) {
                        throw err3;
                    }
                    connection.query('SELECT COUNT(id) as totaloffers FROM activity where userID = "' + uid + '" and activity = "Offer Received";', function (err4, data4) {
                        if (err4) {
                            throw err4;
                        }
                        connection.query('SELECT * FROM activity as a LEFT JOIN jobs as j ON a.jobID = j.id WHERE j.userID = "' + uid + '" AND j.active = "1" ORDER BY a.activityDate DESC LIMIT 10;', function (err5, data5) {
                            if (err5) {
                                throw err5;
                            }
                            res.render("dashboard.ejs", {
                                data: data,
                                data2: data2,
                                data3: data3,
                                data4: data4,
                                data5: data5
                            });
                        });
                    });
                });
            });
        });
    });

    // Get list of job from db and send to dashboard template
    app.get("/joblist", isLoggedIn, function (req, res) {
        // get id of current user and display their jobs
        var uid = req.user.id;
        connection.query("SELECT * FROM jobs where userID = " + uid + ";", function (err, data) {
            if (err) {
                throw err;
            }
            res.render("joblist.ejs", {
                data: data
            });
        });
    });

    // show form to add job to DB
    app.get("/addjob", isLoggedIn, function (req, res) {
        res.render('addjob.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // Add a new job to the list
    app.post("/job/new", isLoggedIn, function (req, res) {
        // get the values from the form
        var job = req.body;
        // grab the id of the current user
        var uid = req.user.id;

        // insert new job into DB
        connection.query('INSERT INTO jobs (jobtitle,location,company,contact,phone,email,webpage,source,m' +
            'ethod,userID,active) VALUES ("' + job.jobtitle + '","' + job.location + '","' + job.company + '","' + job.contact + '","' + job.phone + '","' + job.email + '","' + job.webpage + '","' + job.source + '","' + job.method + '","' + uid + '","1")',
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                var jobID = data.insertId;
                console.log("jobID", data.insertId);
                connection.query('INSERT INTO activity (activity,activityDate,jobID) VALUES ("Resume Sent","' + job.dateSent + '","' + jobID + '");', function (err2, result2) {
                    if (err2) {
                        console.log(err2);
                    }
                });
                res.redirect("/job/" + jobID + "");
            });
    });

    // Add activity to job listing
    app.post("/job/activity", isLoggedIn, function (req, res) {
        // get the values from the form
        var act = req.body;

        // // insert new activity into table
        connection.query('INSERT INTO activity (jobID,activity,activityDate,userID) VALUES ("' + act.jobID + '","' + act.activity + '","' + act.activityDate + '","' + act.userID + '");', function (err, result) {
            if (err) {
                console.log(err);
            }
            // check to see if this is the most recent activity
            connection
                .query('SELECT * from activity WHERE jobID = "' + act.jobID + '" ORDER BY activityDate DESC LIMIT 1;', function (err2, result2) {
                    if (err2) {
                        console.log(err2);
                    }
                    // update job table with new status
                    connection
                        .query('UPDATE jobs SET status = "' + result2[0].activity + '" WHERE id = "' + act.jobID + '";', function (err3, result3) {
                            if (err3) {
                                console.log(err3);
                            }
                            // change active to false if activity is declined or another candidate was
                            // selected
                            if (act.activity == "Company Chose Another Candidate" || act.activity == "Declined Offer") {
                                connection
                                    .query('UPDATE jobs SET active = "0" WHERE id = "' + act.jobID + '";', function (err4, result4) {
                                        if (err4) {
                                            console.log(err4);
                                        }
                                    });
                            }
                        });
                });
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
                .query('SELECT DATE_FORMAT(activityDate, "%m/%d/%Y") as actDate,activity FROM activity w' +
                    'here jobID = "' + jobid + '" ORDER BY activityDate;',
                    function (err2, data2) {
                        if (err) {
                            throw err;
                        }
                        res.render("detail.ejs", {
                            data: data,
                            data2: data2
                        });

                    });
        });
    });

    // show the login page app.get('/login', function (req, res) {
    // res.render('login'); }); process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
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

    // show the signup form app.get('/signup', passport.authenticate('local-signup',
    // {     successRedirect: '/dashboard', // redirect to the secure profile
    // section     failureRedirect: '/signup', // redirect back to the signup page
    // if there is an error     failureFlash: true // allow flash messages }));
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // ===================================== LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}