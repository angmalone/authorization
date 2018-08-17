var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");
var flash = require("connect-flash");
var hbs = require("hbs");
var Auth0Strategy = require("passport-auth0");
var passport = require("passport");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var session = require("express-session");
var cors = require("cors");

dotenv.load();

var app = express();

app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "PATEKWATER",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(flash());

if (app.get("env") === "production") {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/", authRouter);

var strategy = new Auth0Strategy(
  {
    domain: "engageproject.auth0.com",
    clientID: "h7bFxRL3SD6byp8exB8DY4K2dYhP8qAn",
    clientSecret:
      "0oTf6rlBT-SoYAJAhy77Atal3-xlao81WBLrwz6TcAI98DVpfR-K6nFDJGwIzOvz", // Replace this with the client secret for your app
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
  console.log(`HOPPIN OUT PORT ${app.get("port")} ESSKEETIT 🐍 `);
});
