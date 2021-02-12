const express = require("express");
const router = express.Router();
const Axios = require("axios");

const API_URL = "http://hn.algolia.com/api/v1/search_by_date?query=poker?tags=story";

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.get("/search", function (req, res, next) {
  Axios.get(API_URL)
      .then(result => {
          const { hits } = result.data;
          res.status(200).send(hits);
      })
      .catch(error => console.error(error));
});

module.exports = router;
