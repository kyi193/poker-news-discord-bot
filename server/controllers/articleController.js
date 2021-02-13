const articleModel = require('../models/Article');
const { Article } = articleModel;

module.exports = {
  createArticle: async (req, res) => {
    const { title, published, url } = req.body;

    try {
      const articleDoc = await new Article({
        title,
        published,
        url,
      }).save();

      res.json(articleDoc);
    } catch (e) {
      return { error: e };
    };
  },
};
