require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const flash = require('express-flash');
const session = require('express-session');
const filestore = require('session-file-store');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./src/routes/index');
const cardRouter = require('./src/routes/card');
const statRouter = require('./src/routes/statistics');
const profileRouter = require('./src/routes/profile');

const dbConnect = require('./dbConnect');
const User = require('./src/models/user');
const isUser = require('./src/middleware/user');
const isAuth = require('./src/middleware/auth');
const app = express();

dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('session cookie name', 'sid');
hbs.registerPartials(path.join(__dirname, 'src', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const FileStore = filestore(session);
app.use(
  session({
    name: app.get('session cookie name'),
    secret: process.env.SESSION_SECRET,
    store: new FileStore({
      // Шифрование сессии
      secret: process.env.SESSION_SECRET,
    }),
    // Если true, сохраняет сессию, даже если она не поменялась
    resave: false,
    // Если false, куки появляются только при установке req.session
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'emailLogin',
      passwordField: 'loginPassword',
    },
    async function (username, password, done) {
      const user = await User.findOne({ email: username }, function (
        err,
        user
      ) {
        if (user) {
          try {
            if (bcrypt.compare(password, user.password)) {
              done(null, user);
            } else {
              done(null, false, { message: 'Wrong login or email' });
            }
          } catch (e) {
            done(e);
          }
        } else {
          done(null, false, { message: 'Wrong login or email' });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, { id: user.id, name: user.username });
});

passport.deserializeUser(async function (user, done) {
  await User.findById(user.id, function (err, user) {
    done(err, user);
  });
});

app.use(isUser);
app.use('/', indexRouter);
app.use('/card', isAuth, cardRouter);
app.use('/statistics', statRouter);
app.use('/profile', profileRouter);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000);
