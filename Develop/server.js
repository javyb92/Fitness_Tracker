const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

db.Workout.create({ name: "Workouts" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({message}) => {
    console.log(message);
  });

app.get("/exercises", (req, res) => {
  db.exercises.find({})
    .then(dbexcerises => {
      res.json(dbexercises);
    })
    .catch(err => {
      res.json(err);
    });
});


  app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
