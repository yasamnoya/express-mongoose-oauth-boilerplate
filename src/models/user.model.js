const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
