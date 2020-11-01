function isUser(req, res, next) {
  if (req.session?.passport?.user) {
    res.locals.username = req.session?.passport?.user.name;
    res.locals.id = req.session?.passport?.user.id;
  } else {
    res.locals.username = null;
    res.locals.id = null;
  }
  next();
}

module.exports = isUser;
