import express from 'express';
import Block from '../models/Block'; // Import the Block Model
const router = express.Router();

//Create a New Block entry
router.post('/', (req, res, next) => {
  if (req.body.first_name) {
    Block.forge({
      first_name: req.body.first_name,
      last_name: req.body.last_name || null
    })
      .save()
      .then(saved => {
        res.json({ saved });
      });
  } else {
    res.status(400).send('Missing Parameters');
  }
});

module.exports = router;
