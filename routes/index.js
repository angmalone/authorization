const express = require("express");
const passport = require("passport");
const router = express.Router();

const Snack = require("../db/snacks");

router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/api/snacks", (req, res) => {
  Snack.find()
    .then(snacks => {
      res.json(snacks);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get(
  "/callback",
  passport.authenticate("auth0", {
    failureRedirect: "/failure"
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || "/user");
  }
);

router.get("/failure", function(req, res) {
  var error = req.flash("error");
  var error_description = req.flash("error_description");
  req.logout();
  res.render("failure", {
    error: error[0],
    error_description: error_description[0]
  });
});

module.exports = router;
