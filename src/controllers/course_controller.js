import Course from '../models/course_model';

export const createCourse = (req, res) => {
  const newCourse = {
    crn: req.body.crn,
    program: req.body.subject,
    number: req.body.number,
    section: req.body.section,
    title: req.body.title,
    period: req.body.period,
    instructor: req.body.instructor,
    distribs: req.body.distribs,
    world_culture: req.body.world_culture,
    description: req.body.description,

  };
  const post = new Course(newCourse);
  post.save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getCourses = (req, res) => {
  Course.find({})
    .sort({ score: -1 })
    .limit(20)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const getCourseByQuery = (req, res) => {
  if (req.params.query) {
    const query = req.params.query.trim();
    let numb = query.match(/\d/g);
    if (numb) {
      numb = numb.join('');
    } else {
      numb = -1;
    }
    const regexPatern = `.*${query}.*`;
    Course.find({
      $or: [
        { title: { $regex: regexPatern, $options: 'i' } },
        { program: { $regex: regexPatern, $options: 'i' } },
        { instructor: { $regex: regexPatern, $options: 'i' } },
        { number: numb },
      ],
    })
      .sort({ score: 1 })
      .limit(25)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};

export const getCourse = (req, res) => {
  Course.findById(req.params.id)
    .populate('students')
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
