const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUser
);

router.post(
  '/addArticle',
  passport.authenticate('jwt', { session: false }),
  userController.addArticle
);

module.exports = router;
