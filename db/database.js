const mongoose = require('mongoose');
const sampleData = require('../data/sampleData.js');


mongoose.connect("mongodb://localhost/restaurant" || `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@ds259778.mlab.com:59778/abouts`);

const aboutSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  about: {
    description: String,
    hours: String,
    price: String,
    style: String,
    phone: String,
  },
  banner: [],
  photo: [],
});


const About = mongoose.model('About', aboutSchema);

let count = 0;

sampleData.forEach((data) => {

  const about = new About(data);

  about.save((err, res) => {
    if (err) {
      // console.log(err, 'errrrrr');
    } else {
      count += 1;
      if (count === 119) {
        mongoose.disconnect();
      }
    }
  });
});

const find = (obj, cb) => {
  About.find(obj, (err, about) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, about);
    }
  });
};

const findOne = (obj, cb) => {
  About.findOne({}, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

module.exports.find = find;
module.exports.findOne = findOne;

