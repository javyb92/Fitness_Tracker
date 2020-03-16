const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Exercise type is Required"
            },
            name: {
                type: String,
                trim: true,
                required: "Exercise name is Required"
            },
            duration: {
                type: Number,
                required: "Duration type is Required"
            },
            weight: { 
                type: Number,
            },
            reps: { 
                type: Number,

            },
            sets: {
                type: Number,

            },
            distance: {
                type: Number,
            }
        }
    ]
  },
  {
    // toObject: {
    // virtuals: true
    // },
    toJSON: {
    virtuals: true 
    },


    

});

WorkoutSchema.virtual("totalDuration").get(function () {
    const exercisesCalculated = this.exercises;
    const durationSum = exercisesCalculated.reduce((total, exercisesCalculated) => {
      return total += exercisesCalculated.duration;
    }, 0);
    return durationSum;
  });



const Workout = mongoose.model("Workout", WorkoutSchema);



module.exports = Workout;