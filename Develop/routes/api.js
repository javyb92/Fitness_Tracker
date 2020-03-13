
var db = require("../models")

module.exports = function(app) {

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

  app.put("/workouts", function(req, res) {
    db.Workout.update(req.body,
      {
        day:{
          default: req.body
        },
        exercises: {
          type: req.body.type,
          name: req.body.name,
          duration: req.body.duration,
          weight: req.body.weight,
          reps: req.body.reps,
          sets: req.body.sets,
          distance: req.body.distance,
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
}