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

router.get(
  '/getArticles',
  passport.authenticate('jwt', { session: false }),
  userController.getArticles
);

router.delete(
  '/removeArticle/:articleId',
  passport.authenticate('jwt', { session: false }),
  userController.removeArticle
);

router.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userController.logout
);

module.exports = router;
