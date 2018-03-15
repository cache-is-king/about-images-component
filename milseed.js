const faker = require('Faker');
const fs = require('fs');

const file = fs.createWriteStream('./millis/send.json');

const create = (i) => {
  const storage =
  {
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
  };
  return storage;
};

const seedDatabase = (creationFunction, creationLimit, i) => {
  let space = true;
  while (i < creationLimit && space) {
    const restaurant = creationFunction(i);
    space = file.write(JSON.stringify(restaurant));
    i += 1;
  }
  if (i < creationLimit) {
    file.once('drain', () => {
      seedDatabase(create, creationLimit, i);
    });
  }
};
seedDatabase(create, 10000000, 0);
