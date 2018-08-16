const Snack = require("./snacks");
const snackData = require("./snacks.json");

Snack.remove({})
  .then(() => {
    return Snack.collection.insert(snackData);
  })
  .then(() => {
    process.exit();
  });
