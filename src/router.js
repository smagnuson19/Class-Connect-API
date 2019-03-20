import { Router } from 'express';
import * as CourseController from './controllers/course_controller';
import * as UserController from './controllers/user_controller';
import { requireSignin, requireAuth } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);

router.route('/courses')
  .get((req, res) => { CourseController.getCourses(req, res); });
// .post((req, res) => { CourseController.createCourse(req, res); });

router.route('/courses/:id')
  .get((req, res) => { CourseController.getCourse(req, res); });

router.route('/courses/search/:query')
  .get((req, res) => { CourseController.getCourseByQuery(req, res); });

router.route('/users')
  .get((req, res) => { UserController.getUsers(req, res); });
// .post((req, res) => { StudentController.addStudent(req, res); });

router.route('/users/:id')
  .get((req, res) => { UserController.getUser(req, res); });

router.route('/user/courses')
  .get(requireAuth, (req, res) => { UserController.getUserCourses(req, res); })
  .post(requireAuth, (req, res) => { UserController.addUserToCourse(req, res); })
  .delete(requireAuth, (req, res) => { UserController.dropUserFromCourse(req, res); });


export default router;
