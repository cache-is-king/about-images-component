const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/restaurant");

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

const create = (start, length) => {
  const storage = [];
  for (let i=start; i < start + length; i++) {
    storage.push({
      id: i,
      name: 'String',
      about: {
        description: 'String',
        hours: 'String',
        price: 'String',
        style: 'String',
        phone: 'String',
      },
      banner: [],
      photo: [],
    });
  }
  return storage;
}


const seedDatabase = (creationFunction, creationAmountForEach, eachStartPoint, creationLimit) => {
  About.count({}, (err, count) => {
    if (count !== creationLimit) {
      const amountOfRestaurants = creationFunction(eachStartPoint, creationAmountForEach);
      console.log(amountOfRestaurants);
      About.create(amountOfRestaurants)
      .then(() => {
        seedDatabase(create, creationAmountForEach, eachStartPoint + creationAmountForEach, creationLimit);
      })
      .catch(err => {
        throw err;
      });
    } else {
      console.log(count);
      mongoose.disconnect();
  }

  })
}

seedDatabase(create, 10000, 0, 10000000);

