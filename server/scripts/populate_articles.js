const mongoose = require('mongoose');
const ArticleModel = require('../models/Article');
const { Article } = ArticleModel;

const fs = require('fs');
const e = require('express');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/poker-news", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
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

connectDB();
populate();
