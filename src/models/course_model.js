import mongoose, { Schema } from 'mongoose';

const CourseSchema = new Schema({
  crn: Number,
  program: String,
  number: Number,
  section: Number,
  title: String,
  period: String,
  instructor: String,
  distribs: String,
  world_culture: String,
  description: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true,
  },
});

// CourseSchema.virtual('score').get(function score() {
//   return this.students.length;
// });

// create model class
const CourseModel = mongoose.model('Course', CourseSchema);

export default CourseModel;
