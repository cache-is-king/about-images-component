const express = require('express');
const db = require('../db/queries.js');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  db.findOnePostGres(id, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data[0]);
    }
  });
});

// router.get('/:id', (req, res) => {
//   // res.set({ 'Access-Control-Allow-Origin' : '*' });
//   db.findOne({ name: req.params.id }, (err, data) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       res.send(data);
//     }
//   });
// });

module.exports = router;
