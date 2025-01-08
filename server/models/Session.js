const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  socketId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Session', sessionSchema); 