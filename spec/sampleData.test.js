const sampleData = require('../data/sampleData.js');

// FOR REFERENCE WHEN REVIEWING
// let repoSchema = mongoose.Schema({
//   id: {
//     type: String,
//     unique: true,
//   },
//   restaurant: String,
//   about: {
//     description: String,
//     hours: String,
//     price: String,
//     style: String,
//     phone: string,
//   },
//   banner: String,
//   photo: [],
// });

describe('the length of sampleData should match initial data', () => {
  it('length should be 119', () => {
    expect(sampleData.length).toBe(119);
  });
});

describe('each property should match my schema data type', () => {
  it('the values in my sampleData should equal to the type that was set in schema', () => {
    for (let i = 0; i < sampleData.length; i++) { // to make sure ALL data in my dummy data has the same property rather than dummy[0]
      expect(typeof sampleData[i].id).toBe('number');
      expect(typeof sampleData[i].about).toBe('object');
      expect(typeof sampleData[i].about.description).toBe('string');
      expect(typeof sampleData[i].about.hours).toBe('string');
      expect(typeof sampleData[i].about.price).toBe('string');
      expect(typeof sampleData[i].about.style).toBe('string');
      expect(typeof sampleData[i].about.phone).toBe('string');
      expect(Array.isArray(sampleData[i].banner)).toBe(true);
      expect(Array.isArray(sampleData[i].photo)).toBe(true);
    }
  });
});
