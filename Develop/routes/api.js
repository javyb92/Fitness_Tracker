const mongoose = require("mongoose");
var db = require("../models")

module.exports = function(app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });
  
  
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  

  app.put("/api/workouts/:id", (req, res) => {
      db.Workout.update(
        {
          _id: mongoose.ObjectId(req.params.id)
        },
        {
          $push: {
            exercises: req.body
          }
        },
    
        (error, edited) => {
          if (error) {
            console.log(error);
            res.send(error);
          } else {
            console.log(edited);
            res.send(edited);
          }
        }
      );
    });
}

