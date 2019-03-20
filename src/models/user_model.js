import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.virtual('fullName').get(function fullName() {
  return `${this.firstName} ${this.lastName}`;
});

// found similar code at https://stackoverflow.com/questions/14588032/mongoose-password-hashing
// comparing the passwords using bcrypt
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, result) => {
    if (err) {
      return callback(err);
    }
    return callback(null, result);
  });
};

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
    } else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        } else {
          user.password = hash;
          return next();
        }
      });
    }
  });
  return null;
});

// create model class
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
