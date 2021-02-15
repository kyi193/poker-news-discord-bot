const UserModel = require('../models/User');
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
  getUser
};
