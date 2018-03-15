const faker = require('Faker');
const fs = require('fs');

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
  const whos = ['homie', 'young g', 'broski', 'bro', 'fam', 'dawg'];
  let eachStartPoint = 0;
  while (i < creationLimit) {
    const who = whos[Math.floor(Math.random() * whos.length)];
    console.log(i, 'thank you for your patience', who);
    const amountOfRestaurants = creationFunction(eachStartPoint, creationAmountForEach);
    fs.writeFileSync(`./millis/send-${i}.json`, JSON.stringify(amountOfRestaurants));
    i += 1;
    eachStartPoint = creationAmountForEach + eachStartPoint;
  }
};
seedDatabase(create, 200000, 50);
