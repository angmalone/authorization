const mongoose = require("../db/connection");

const SnackSchema = new mongoose.Schema({
  name: String,
  requestedBy: String,
  amazonURL: String
});

const Snack = mongoose.model("Snack", SnackSchema);

module.exports = Snack;
