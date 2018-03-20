const mongoose = require('mongoose');
const redisClient = require('redis').createClient;
const postDb = require('./db.js');

const redis = redisClient(6379, 'localhost');

const db = mongoose.createConnection('mongodb://localhost/restaurant');
const About = db.model('About', new mongoose.Schema({
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
}));
const findOne = (obj, cb) => {
  redis.get(obj.name, (err, reply) => {
    if (err || reply === null) {
      About.findOne(obj, (error, doc) => {
        if (error) {
          cb(error, null);
        } else {
          redis.set(obj.name, JSON.stringify(doc), () => {
            cb(error, doc);
          });
        }
      });
    } else if (reply) {
      cb(err, JSON.parse(reply));
    }
  });
};
const findOnePostGres = (val, cb) => {
  redis.get(val, (err, reply) => {
    if (err || reply === null) {
      postDb.query('SELECT * FROM restaurants WHERE name = $1', [val], (error, doc) => {
        if (error) {
          cb(error, null);
        } else {
          redis.set(val, JSON.stringify(doc), () => {
            cb(error, doc);
          });
        }
      });
    } else if (reply) {
      cb(err, JSON.parse(reply));
    }
  });
};
module.exports.findOnePostGres = findOnePostGres;
module.exports.findOne = findOne;
