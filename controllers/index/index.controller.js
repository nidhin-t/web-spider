const User = require("../../models/user");
const emailService = require("./module/emailService");
const smsService = require('./module/smsService');

exports.getHomePage = (req, res, next) => {
    res.status(200).render("index", {
        pageTitle: "Sign Up Form",
        editing: false,
    });
};

exports.postDetails = (req, res, next) => {
    let user = new User(
        req.body.name,
        req.body.email,
        parseInt(req.body.phone),
        req.body.message
    );
    user.saveIntoFile();
    res.redirect("/show-details");
};

exports.showDetails = (req, res, next) => {
    User.fetchLastUser(async(user) => {
        await emailService.sendMail(user) // * send email 
        await smsService.sendSMS(user) // * send SMS

        // * Finally display the message in response html page
        res.status(200).render("index", {
            pageTitle: "Info from saved file",
            editing: true,
            user: user,
        });

    })
};