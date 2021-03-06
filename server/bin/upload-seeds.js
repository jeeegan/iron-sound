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
    title: "Cuvry Bleibt",
    artist: "Alec Budd",
    album: "Beats",
    year: 2019,
    genre: "Techno",
    upload_url: "https://res.cloudinary.com/jeeegan/video/upload/v1551707921/cuvry_bleibt.mp3",
    _created_by: "5c77e61ee8e56c780ea00115",
  },
  {
    title: "Uhland",
    artist: "Alec Budd",
    album: "Beats",
    year: 2019,
    genre: "Techno",
    upload_url: "https://res.cloudinary.com/jeeegan/video/upload/v1551708866/U1_to_Uhlandstra%C3%9Fe_demo.mp3",
    _created_by: "5c77e61ee8e56c780ea00115",
  },
  {
    title: "Autoimmune",
    artist: "Alec Budd",
    album: "Beats",
    year: 2018,
    genre: "Techno",
    upload_url: "https://res.cloudinary.com/jeeegan/video/upload/v1551708874/6_28_Autoimmune.mp3",
    _created_by: "5c77e61ee8e56c780ea00115",
  },
  {
    title: "Lift Me Up",
    artist: "Alec Budd",
    album: "Beats",
    year: 2019,
    genre: "Techno",
    upload_url: "https://res.cloudinary.com/jeeegan/video/upload/v1551708907/lift_me_up_master_1.wav",
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