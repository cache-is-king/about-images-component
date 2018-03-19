const $ = require('jquery');

// const BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : '';

const get = (id, cb) => {
  $.ajax({
    url: `/restaurants/${id}`,
    method: 'GET',
    success: (data) => {
      cb(null, data);
    },
  });
};

module.exports.get = get;
