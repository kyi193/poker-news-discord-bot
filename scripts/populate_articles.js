const mongoose = require('mongoose');
const ArticleModel = require('../models/Article');
const { Article } = ArticleModel;
const path = require('path');
require('dotenv').config({path: path.resolve('../.env')});
const { connectDB } = require('../config/db');

const fs = require('fs');

const populate = (async () => {
  const articles = await JSON.parse(fs.readFileSync('articles.json', 'utf-8'));

  for (const article of articles) {
    const { id, title, link, published } = article;

    try {
      await new Article({ id, title, url: link, published }).save();
    } catch (e) {
      console.error(e);
    }
  };
  console.log("All articles saved to db");
  mongoose.disconnect();
})

connectDB();
populate();
