const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opts = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  autoCreate: true,
};

const ArticleSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    index: Number,
    title: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true
    },
  },
  opts
);

const Article = mongoose.model('Article', ArticleSchema);

const getArticlesForDiscord = async (articleList) => {
  const articles = [];
  for(const articleId of articleList) {
    try {
      const article = await Article.findById({ _id: articleId });
      articles.push(article)
    } catch (e) {
      console.error(e);
    }
  }
  return articles;
}

module.exports = { Article, getArticlesForDiscord };
