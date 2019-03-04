// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Upload = require("../models/Upload");

const bcryptSalt = 10;

require('../configs/database');

let uploads = [
  {
    title: "Modern Love",
    artist: "Biffy Clyro",
    album: "Howard Stern tribute to David Bowie",
    year: 2019,
    genre: "Rock",
    tags: [],
    upload_url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/574077195&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    _created_by: "5c77e61ee8e56c780ea00115",
},
]

Upload.deleteMany()
  .then(() => {
    return Upload.create(uploads)
  })
  .then(uploadsCreated => {
    console.log(`${uploadsCreated.length} uploads created with the following id:`);
    console.log(uploadsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })