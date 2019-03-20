import Course from './models/course_model';
import data from '../static/data.json';

export default function populate() {
  Course.findOne({})
    .then((course) => {
      if (!course) {
        console.log('no courses found');
        data.forEach((item, index) => {
          console.log(`${index}courses added`);
          const newCourse = {
            crn: item.crn,
            program: item.program,
            number: item.number,
            section: item.section,
            title: item.title,
            period: item.period,
            instructor: item.instructor,
            distribs: item.distribs,
            world_culture: item.world_culture,
            description: item.description,
          };
          const c = new Course(newCourse);
          c.save();
        });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log('FAILURE! Did not create new database!');
    });
}
