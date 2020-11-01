const express = require('express');
const Guess = require('../models/guess');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  return res.render('profile');
});

module.exports = router;
