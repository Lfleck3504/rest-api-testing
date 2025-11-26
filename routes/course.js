const Joi = require('@hapi/joi'); 

module.exports = [

  {
    method: 'GET',
    path: '/courses/{subject}',
    handler: (request, h) => {
      const subject = request.params.subject;
      return subject; 
    },
  },
    {
    method: 'GET',
    path: '/courses/credits/{number}',
    handler: (request, h) => {
      const num = request.params.number; 
      return num; 
    },
  },
];