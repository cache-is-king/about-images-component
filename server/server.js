require('newrelic');
const port = process.env.PORT || 8082;
const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const http = require('http');
const mongoose = require('mongoose');
const redisClient = require('redis').createClient;

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
// let MongoCount = 0;
// let RedisCount = 0;
http.createServer((req, res) => {
  const { method, url } = req;
  if (url === '/' || url.startsWith('/?=')) {
    fs.readFileAsync(path.join(__dirname, '../client/dist/index.html'), 'utf8')
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      })
      .catch(() => {
        res.writeHead(500);
        res.end();
      });
  } else if (url.match('.js')) {
    const stream = fs.createReadStream(path.join(__dirname, '../client/dist/bundle.js'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    stream.pipe(res);
  } else if (url.match('.css')) {
    const stream = fs.createReadStream(path.join(__dirname, '../client/dist/styles.css'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    stream.pipe(res);
  } else if (url.startsWith('/favicon.ico')) {
    res.writeHead(404);
    res.end();
  } else if ((method === 'GET' && url.startsWith('/restaurants/')) || (method === 'GET' && url.startsWith('/?='))) {
    const body = url.split('/');
    const term = body[2];
    const newTerm = term.split('%20');
    const searchTerm = newTerm.join(' ');
    console.log(searchTerm);
    if (typeof Number(searchTerm) === 'number' && !isNaN(Number(searchTerm))) {
      redis.get(searchTerm, (err, reply) => {
        if (reply === null) {
          About.findOne({ id: searchTerm }, (error, doc) => {
            // console.log(MongoCount += 1, " MONGO");
            if (error) {
              res.writeHead(404);
              res.end();
            } else {
              redis.setex(searchTerm, 5, JSON.stringify(doc), () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(doc));
              });
            }
          });
        } else if (reply) {
          // console.log(RedisCount += 1, "REDIS");
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.parse(reply));
        }
      }); 
    } else {
      redis.get(searchTerm, (err, reply) => {
        if (reply === null) {
          About.findOne({ name: searchTerm }, (error, doc) => {
            // console.log(MongoCount += 1, " MONGO2");
            if (error) {
              res.writeHead(404);
              res.end();
            } else {
              redis.setex(searchTerm, 5, JSON.stringify(doc), () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(doc));
              });
            }
          });
        } else if (reply) {
          // console.log(RedisCount += 1, "REDIS");
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(reply);
        }
      });
    }
  }
}).listen(port);
