const router = require('express').Router();
const passport = require('../config/passport');

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/github',
  passport.authenticate('github'),
);

router.get(
  '/github/callback',
  passport.authenticate('github'),
  (req, res) => {
    res.redirect('/protected');
  },
);

module.exports = router;