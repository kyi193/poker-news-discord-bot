const mongoose = require('mongoose');
const ArticleModel = require('../models/Article');
const { Article } = ArticleModel;

const fs = require('fs');
const e = require('express');

const connectAtlasDB = async () => {
  mongoose.connect(process.env.MONGO_ATLAS_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));
};

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

connectAtlasDB();
populate();
