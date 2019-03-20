import jwt from 'jwt-simple';
import dotenv from 'dotenv';

import User from '../models/user_model';
import Course from '../models/course_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(422).send('You must provide email and password');
  } else {
    User.findOne({ email }, (err, s) => {
      if (!s) {
        const newUser = {
          firstName, lastName, email, password,
        };
        const user = new User(newUser);
        return user.save()
          .then(res.send({ token: tokenForUser(user) }));
      } else {
        return res.status(422).send('An account already exists with this email!');
      }
    });
  }
};

export const removeUser = (req, res) => {
  User.findByIdAndRemove(req.user.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getUsers = (req, res) => {
  return User.find({})
    .then((result) => {
      console.log(result);
      res.json((result));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getUser = (req, res) => {
  User.findById(req.params.id)
    .populate('courses')
    .then((result) => {
      console.log(result);
      res.json((result));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getUserCourses = (req, res) => {
  User.findById(req.user.id)
    .populate('courses')
    .then((user) => {
      res.json(user.courses);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const addUserToCourse = (req, res) => {
  User.findById(req.user.id)
    .populate('courses')
    .then((user) => {
      Course.findById(req.body.courseID)
        .then((course) => {
          course.students.push(user);
          course.score += 1;
          course.save();
          user.courses.push(course);
          user.save();
          res.json(user.courses);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const dropUserFromCourse = (req, res) => {
  User.findById(req.user.id)
    .populate('courses')
    .then((user) => {
      Course.findById(req.body.courseID)
        .then((course) => {
          const courseIndex = user.courses.indexOf(course.toString());
          if (courseIndex > -1) {
            user.courses.splice(courseIndex, 1);
          }
          user.save();

          const userIndex = course.students.indexOf(req.user.id);
          if (userIndex > -1) {
            course.students.splice(userIndex, 1);
            course.score -= 1;
          }
          course.save();

          res.json(user.courses);
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
