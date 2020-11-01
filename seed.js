const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');
const User = require('./src/models/user');
const Theme = require('./src/models/theme');
const Card = require('./src/models/card');
const Guess = require('./src/models/guess');
const faker = require('faker');

dbConnect();

const cardSeed = [
  { question: 'Системный блок: РОК + СУП', answer: 'Корпус' },
  {
    question:
      'Процесс размещения элементов множества в некотором порядке: ИВА + ТРОС + РОК',
    answer: 'Сортировка',
  },
  {
    question:
      'Правила пересылки данных между различными компьютерными сетями: ОПЛОТ + РОК',
    answer: 'Протокол',
  },

  { question: ' В каком году был выпущен Крестный отец?', answer: '1972' },
  {
    question:
      'Сколько самореферентных камей снял Альфред Хичкок в своих фильмах с 1927 по 1976 год - 33, 35 или 37',
    answer: '37',
  },
  {
    question:
      'За какое время перед нами проходят двадцать четыре кадра кинопленки?',
    answer: 'Секунда',
  },

  {
    question:
      'Кто из футболистов утверждал, что "играть надо ногами, а думать – головой',
    answer: 'Пеле',
  },
  {
    question:
      'Правила об этом виде специальных ударов в футболе приняли в 1891 году',
    answer: 'Пенальти',
  },
  {
    question: 'Как называется гол, забитый игроком в ворота своей команды?',
    answer: 'Автогол',
  },

  {
    question: 'Кто из художников создал «Суповые банки Кэмпбелла» в 1962 году?',
    answer: 'Энди Уорхол',
  },
  {
    question: 'В каком городе мира выставлена ​​Мона Лиза Леонардо да Винчи?',
    answer: 'Париж',
  },
  {
    question: 'Какой национальности был художник Анри Матисс?',
    answer: 'Француз',
  },

  { question: 'Назовите страну, где он находится: Колизей', answer: 'Италия' },
  {
    question: 'Назовите страну, где он находится: Тадж-Махал',
    answer: 'Индия',
  },
  {
    question: 'Назовите страну, где он находится: Ангкор-Ват',
    answer: 'Камбоджия',
  },

  { question: 'Что такое Болливуд?', answer: 'Киноиндустрия' },
  { question: 'Назовите национальное животное', answer: 'Тигр' },
  { question: 'Древнее знание о жизни и здоровье?', answer: 'Аюрведа' },

  { question: 'Что изображено на купюре 5000 рублей?', answer: 'Хабаровск' },
  { question: 'Что изображено на купюре 500 рублей?', answer: 'Архангельск' },
  { question: 'Что изображено на купюре 200 рублей?', answer: 'Севастополь' },
];

const flashcardSeed = async () => {
  const cards = await Promise.all(
    cardSeed.map((item) => {
      return new Card(item).save();
    })
  );

  let theme1 = new Theme({
    title: 'Компьютерные анаграммы',
    cards: [cards[0]._id, cards[1]._id, cards[2]._id],
  }).save();

  let theme2 = new Theme({
    title: 'Кино',
    cards: [cards[3]._id, cards[4]._id, cards[5]._id],
  }).save();

  let theme3 = new Theme({
    title: 'Футбол',
    cards: [cards[6]._id, cards[7]._id, cards[8]._id],
  }).save();

  let theme4 = new Theme({
    title: 'Художники',
    cards: [cards[9]._id, cards[10]._id, cards[11]._id],
  }).save();

  let theme5 = new Theme({
    title: 'Достопримечательности',
    cards: [cards[12]._id, cards[13]._id, cards[14]._id],
  }).save();

  let theme6 = new Theme({
    title: 'Индия',
    cards: [cards[15]._id, cards[16]._id, cards[17]._id],
  }).save();

  let theme7 = new Theme({
    title: 'Банкноты России',
    cards: [cards[18]._id, cards[19]._id, cards[20]._id],
  }).save();
};

flashcardSeed();
