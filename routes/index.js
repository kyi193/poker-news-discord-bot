const express = require("express");
const router = express.Router();
const Axios = require("axios");
require('dotenv').config({path:'../.env' });

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.get("/search", function (req, res) {
  const request = {
    method: 'get',
    url: 'https://google-search3.p.rapidapi.com/api/v1/news/q=poker?num=100',
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'google-search3.p.rapidapi.com',
      'useQueryString': true
    },
    json: true,
    gzip: true,
  };

  Axios(request)
      .then(result => {
        const { entries } = result.data;
        const articles = [];

        for(const entry of entries) {
          articles.push({
            id: entry.id,
            title: entry.title,
            link: entry.link,
            published: entry.published
          })
        }
        res.status(200).send(articles);
      })
      .catch(error => console.error(error));
});

module.exports = router;
