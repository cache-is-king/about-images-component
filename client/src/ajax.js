const $ = require('jquery');

const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : '';

const get = (id, cb) => {
  $.ajax({
    url: `${BASE_URL}/restaurants/${id}`,
    method: 'GET',
    success: (data) => {
      cb(null, data);
    },
  });
};

module.exports.get = get;
