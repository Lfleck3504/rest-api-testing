const Joi = require('@hapi/joi'); 

module.exports = [
  {
    method: 'GET',
    path: '/gened/{category_code}',
    handler: (request, h) => {
      const categoryCode = request.params.category_code;
      return categoryCode;
    },
  },
];