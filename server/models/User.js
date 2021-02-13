const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const opts = {
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },

  toObject: {
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
    },
  },
};

const UserSchema = new Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Article',
      },
    ],
  },
  opts
);

const User = mongoose.model('User', UserSchema);

const registerUser = async (req) => {
  const { email, firstName, lastName, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return { error: 'Email already exists' };
  }

  try {
    let newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    newUser = await newUser.save();

    return { user: newUser };
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = { User, registerUser };
