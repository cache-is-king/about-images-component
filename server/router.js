const express = require('express');
const db = require('../db/queries.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  // res.set({ 'Access-Control-Allow-Origin' : '*' });
  db.findOne({ name: req.params.id }, (err, data) => {

    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});


module.exports = router;
