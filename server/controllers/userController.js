const UserModel = require('../models/User');
const { User } = require('../models/User');
const { Article } = require('../models/Article');
const validateRegister = require('../user-validation/register');
const validateLogin = require('../user-validation/login');
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  //validate registration
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = UserModel.registerUser(req);
  user.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      createTokenResponse(data.user, res);
    }
  });
};

const login = (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const user = UserModel.loginUser(req);
  user.then((data) => {
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      createTokenResponse(data.user, res);
    }
  });
};

const getUser = (req, res) => {
  res.status(200).json({ user: req.user });
}

const addArticle = async (req, res) => {
  const { id } = req.user;
  const { _id } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    const article = await Article.findOne({ _id });
    
    if(!user.articles.includes(_id)) {
      user.articles.push(article);
      user.save();
      res.status(200).json(user);
    } else {
      res.status(409).json({ error: "Article already exists in list." });
    };
    
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e });
  };
}

const getArticles = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findOne({ _id: id }).populate('articles');
    res.status(200).json(user.articles);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e });
  };
}

const createTokenResponse = (user, res) => {
  const payload = { userId: user._id };
  return jwt.sign(
    payload,
    SECRET_KEY,
    {
      expiresIn: 2629744, // 1 month in seconds
    },
    (err, token) => {
      let responseObj = { user, token };
      res
        .status(201)
        .cookie('token', token, { httpOnly: true })
        .json(responseObj);
    }
  );
}

module.exports = {
  register,
  login,
  getUser,
  addArticle,
  getArticles
};
