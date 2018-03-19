const faker = require('faker');
const fs = require('fs');
const Promise = require('bluebird');

const create = (start, length) => {
  const storage = [];
  for (let i = start; i < start + length; i += 1) {
    storage.push({
      id: i,
      name: faker.Company.companyName(),
      about: {
        description: faker.Lorem.paragraph(),
        hours: `${faker.random.number()}-${faker.random.number()}`,
        price: `${faker.random.number()}-${faker.random.number()}`,
        style: `${faker.random.number()}-${faker.random.number()}`,
        phone: `${faker.PhoneNumber.phoneNumber()}`,
      },
      banner: [`${faker.Image.imageUrl()}`, `${faker.Image.imageUrl()}`, `${faker.Image.imageUrl()}`, `${faker.Image.imageUrl()}`],
      photo: [`${faker.Image.imageUrl()}`, `${faker.Image.imageUrl()}`, `${faker.Image.imageUrl()}`],
    });
  }
  return storage;
};

const seedDatabase = (creationFunction, creationAmountForEach, creationLimit) => {
  let i = 0;
  let eachStartPoint = 0;
  while (i < creationLimit) {
    const amountOfRestaurants = creationFunction(eachStartPoint, creationAmountForEach);
    fs.writeFileSync(`./millis/send-${i}.json`, JSON.stringify(amountOfRestaurants));
    i += 1;
    eachStartPoint = creationAmountForEach + eachStartPoint;
  }
};
seedDatabase(create, 200000, 50);

const file = fs.createWriteStream('./millions/send.json');

if (process.argv[2] === 'MONGO') {
  const create = (i) => {
    const storage =
    {
      id: i,
      name: faker.company.companyName(),
      about: {
        description: faker.lorem.paragraph(),
        hours: `${faker.random.number(12)}-${faker.random.number(12)}`,
        price: `${faker.random.number(100)}`,
        style: `${faker.lorem.word()}`,
        phone: `${faker.phone.phoneNumber()}`,
      },
      banner: [`${faker.image.imageUrl()}`, `${faker.image.imageUrl()}`, `${faker.image.imageUrl()}`, `${faker.image.imageUrl()}`],
      photo: [`${faker.image.imageUrl()}`, `${faker.image.imageUrl()}`, `${faker.image.imageUrl()}`],
    };
    return storage;
  };
  const seedMongoDatabase = (creationFunction, creationLimit, i) => {
    let space = true;
    while (i < creationLimit && space) {
      const restaurant = creationFunction(i);
      space = file.write(JSON.stringify(restaurant));
      i += 1;
    }
    if (i < creationLimit) {
      file.once('drain', () => {
        seedMongoDatabase(create, creationLimit, i);
      });
    }
  };
  seedMongoDatabase(create, 10000000, 0);
}
if (process.argv[2] === 'POST') {
  const createPost = (i, type) => {
    let storage = '';
    if (type === 'info') {
      storage =
        `${i}, ${faker.company.companyName()}, ${faker.lorem.paragraph()} , ${faker.random.number(12)}-${faker.random.number(12)},
        ${faker.random.number(100)}, ${faker.lorem.word()}, ${faker.phone.phoneNumber()}`;
    }
    if (type === 'banner') {
      storage =
        `${i}, ${faker.image.imageUrl()}, ${faker.image.imageUrl()}, ${faker.image.imageUrl()}, ${faker.image.imageUrl()}`;
    }
    if (type === 'photo') {
      storage =
        `${i}, ${faker.image.imageUrl()}, ${faker.image.imageUrl()}, ${faker.image.imageUrl()}`;
    }
    return storage;
  };
  const seedPostDatabase = (creationFunction, currentFile, creationLimit, i, type) => {
    let space = true;
    while (i < creationLimit && space) {
      const restaurant = creationFunction(i, type);
      space = currentFile.write(`${restaurant}\n`);
      i += 1;
    }
    if (i < creationLimit) {
      currentFile.once('drain', () => {
        seedPostDatabase(createPost, currentFile, creationLimit, i, type);
      });
    }
  };
  const activate = () => {
    const activations = [];
    const options = ['info', 'banner', 'photo'];
    for (let i = 0; i < options.length; i += 1) {
      const postFile = fs.createWriteStream(`./millions/${options[i]}.csv`);
      activations.push(seedPostDatabase(createPost, postFile, 10000000, 0, options[i]));
    }
    Promise.all(activations);
  };
  activate();
}
