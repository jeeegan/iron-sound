const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {type: String, required: true},
  email: {
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'] 
  },
  display_name: {
    type: String,
    required: true,
    unique: true
  },
  bc_url: {
    type: String,
    match: /^https?\:\/\// // Must start by "http://" or "https://"
  },
  sc_url: {
    type: String,
    match: /^https?\:\/\// // Must start by "http://" or "https://"
  },
  yt_url: {
    type: String,
    match: /^https?\:\/\// // Must start by "http://" or "https://"
  },
  yt_embed_1: {
    type: String,
  },
  yt_embed_2: {
    type: String,
  },
  custom_url: {
    type: String,
    match: /^https?\:\/\// // Must start by "http://" or "https://"
  },
  bio: String,
  extendedBio: String,
  location: String,
  user_img: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
