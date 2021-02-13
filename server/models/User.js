const mongoose = require('mongoose');
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

module.exports = { User };
