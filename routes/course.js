const Joi = require('@hapi/joi');
const coursesController = require('../controllers/courses');

module.exports = [
  {
    method: 'GET',
    path: '/courses/{subjectCode}',
    options: {
      validate: {
        params: Joi.object({
          subjectCode: Joi.string().required(),
        }),
      },
    },
    handler: coursesController.getCoursesBySubject,
  },

  {
    method: 'GET',
    path: '/courses/gened/{categoryName}',
    options: {
      validate: {
        params: Joi.object({
          categoryName: Joi.string().required(),
        }),
      },
    },
    handler: coursesController.getGenEdCoursesByCategory,
  },
];