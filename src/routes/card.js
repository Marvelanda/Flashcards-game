const express = require('express');
const router = express.Router();
const Theme = require('../models/theme');
const Card = require('../models/card');
const User = require('../models/user');
const Guess = require('../models/guess');
const isAuth = require('../middleware/auth');

router.get('/', isAuth, async (req, res) => {
  const cards = await Theme.find();

  return res.render('cards', { cards });
});

router.get('/:id', async (req, res) => {
  req.app.locals.firstRigthAnswers = [];
  req.app.locals.wrongAnswers = [];
  const theme = await Theme.findById(req.params.id).populate('cards').lean();

  req.app.locals.deck = [...theme.cards];

  req.app.locals.deck;
  const random = Math.floor(Math.random() * req.app.locals.deck.length);

  return res.render('card', {
    id: req.app.locals.deck[random]._id,
    question: req.app.locals.deck[random].question,
    themeId: req.params.id,
  });
});

router.get('/next/:id', async (req, res) => {
  if (!req.app.locals.deck.length) {
    return res.render('statistics', {
      totalAnswers:
        req.app.locals.wrongAnswers.length +
        req.app.locals.firstRigthAnswers.length,
      rightAnswers: req.app.locals.firstRigthAnswers.length,
    });
  } else {
    const random = Math.floor(Math.random() * req.app.locals.deck.length);

    return res.render('card', {
      id: req.app.locals.deck[random]._id,
      question: req.app.locals.deck[random].question,
      themeId: req.params.id,
    });
  }
});

router.post('/showCards/:id', async (req, res) => {
  const id = req.params.id;
  const findCard = await Card.findById(id).lean();

  if (req.body.answer === findCard.answer) {
    let isInWrongAnswers = req.app.locals.wrongAnswers.includes(findCard);
    if (!isInWrongAnswers) {
      req.app.locals.firstRigthAnswers.push(isInWrongAnswers);
      const findElem = req.app.locals.deck.find(
        (item) => item._id.toString() === id
      );

      const index = req.app.locals.deck.indexOf(findElem);

      req.app.locals.deck.splice(index, 1);
    }

    return res.json({
      answer: 'Уля-ля, Вы совершенно правы!',
    });
  }

  //prettier-ignore
  (req.app.locals.wrongAnswers).push(findCard);
  return res.json({
    answer: `Нууу, почти. Правильный ответ: ${findCard.answer}.`,
  });
});

router.post('/profile', async (req, res) => {
  const findUser = await User.findOne({ email: req.body.result });
  await new Guess({
    user: findUser._id,
    firstCorrectAnswer: firstRigthAnswers.length,
    totalAnswers: wrongAnswers.length + firstRigthAnswers.length,
  }).save();
  res.redirect('/profile');
});

module.exports = router;
