const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGOLOCAL).then(() => {
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
  }).index({ name: 1 });
  const About = mongoose.model('About', aboutSchema);
  About.init().then(() => {
    mongoose.disconnect();
  });
});
