const sampleData = require('../data/sampleData.js');
const db = require('../db/database.js');
const mongoose = require('mongoose');
const seed = require('../db/database.js');

describe('seeded data should be inserted properly', () => {
  test('seeded data should be inserted properly', (done) => {
    db.find({}, (err, data) => {
      if (err) {
        throw err;
      }
      expect(data.length).toBe(119);
      expect(data[0].photo.length).toBe(3);
      done();
    });
  });
});
