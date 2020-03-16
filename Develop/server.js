const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/api")(app);
require("./routes/view")(app);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://username:password1@ds137759.mlab.com:37759/heroku_3w6k50f2",
{
  useMongoClient: true
});
 
app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
