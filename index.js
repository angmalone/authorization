var express = require("express");
var hbs = require("hbs");
var Auth0Strategy = require("passport-auth0");
var passport = require("passport");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");

const app = express();
//app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

var sess = {
  secret: "SLIME LANGUAGE LET'S GO",
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

app.get("/", (req, res) => {
  res.render("index");
});

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(
    `WHAT KIND OF WATER IS THAT? IT'S PORT ${app.get("port")} WATER 🐍 `
  );
});
