const express = require("express");
const hbs = require("hbs");
const Auth0Strategy = require("passport-auth0");
const passport = require("passport");

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});
