const router = require('express').Router();
const { hasLoggedIn } = require('../middlewares/auth.middleware');

router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

router.get('/protected', hasLoggedIn, (req, res) => {
  res.json(req.user);
});

router.use('/auth', require('./auth.route'));

module.exports = router;
