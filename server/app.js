const path = require('path');
const express = require('express');
const router = require('./router.js');
const cors = require('cors');

const app = express();

app.use(cors());


app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/restaurants', router);

module.exports = app;
