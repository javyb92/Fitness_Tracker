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

  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });

  app.post("/exercise", (req, res) => {
    db.Workout.insert(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $set: {
          type: req.body.type,
          name: req.body.name,
          duration: req.body.duration,
          weight: req.body.weight,
          reps: req.body.reps,
          sets: req.body.sets,
          distance: req.body.distance,

          day: Date.now()
        }
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });

  app.listen(3000, () => {
    console.log("App running on port 3000!");
  });
