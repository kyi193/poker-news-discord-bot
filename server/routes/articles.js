const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/', articleController.createArticle);

module.exports = router;
