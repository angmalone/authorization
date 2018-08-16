var express = require("express");
var hbs = require("hbs");
var Auth0Strategy = require("passport-auth0");
var passport = require("passport");
var session = require("express-session");

var sess = {
  secret: "where tf is slime language",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/", authRouter);

var strategy = new Auth0Strategy(
  {
    domain: "engageproject.auth0.com",
    clientID: "F6MIvNG2gP4FxBGtUgDf6aV--8ZgmwBV",
    clientSecret: "YOUR_CLIENT_SECRET", // Replace this with the client secret for your app
    callbackURL: "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(
    `SLIME LANGUAGE WHERE YA AT WE WAITING ON PORT: ${app.get("port")} 🐍 `
  );
});
