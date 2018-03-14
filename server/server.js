const app = require('./app.js');

const port = process.env.PORT || 8081;

const server = app.listen(port, () => {});

module.exports = server;
