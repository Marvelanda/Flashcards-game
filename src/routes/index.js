const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

const salt = process.env.SALT ?? 10;
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const hashPass = await bcrypt.hash(password, Number(salt));
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });
    await newUser.save();

    res.redirect('/');
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/card',
    failureRedirect: '/',
    failureFlash: true,
  })
);

module.exports = router;
