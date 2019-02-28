// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Upload = require("../models/Upload");

const bcryptSalt = 10;

require('../configs/database')

let uploads = [
  {
    title: "",
    artist: "",
    album: "",
    year: 1999,
    genre: "",
    tags: [],
    embed_url: "https://",
    host: "bc",
    _created_by: "",
    upload_img: "",
    upload_type: "track"
},
]

Upload.deleteMany()
  .then(() => {
    return Upload.create(users)
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