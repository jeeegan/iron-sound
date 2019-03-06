// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

require('../configs/database')

let users = [
  {
    _id: "5c77e61ee8e56c780ea00115",
    email: "abudd1094@gmail.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    display_name: "Alec Budd",
    bc_url: "https://alecbudd.bandcamp.com/",
    sc_url: "https://soundcloud.com/alecbudd1994",
    yt_url: "https://www.youtube.com/channel/UCSbLJTJ-Diq_KxUQjnsKxHg?view_as=subscriber",
    custom_url: "",
    bio: "Experiments & compositions of an electronic nature.",
    location: "Berlin",
    user_img: "https://res.cloudinary.com/jeeegan/image/upload/v1551710676/avatar-test.jpg",
    yt_embed_1: '<iframe width="560" height="315" src="https://www.youtube.com/embed/S6QDIW_FzQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    yt_embed_2: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gPkli_80jsM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    extendedBio: "Alec Budd works primarily in the realm of electronic music with a focus on danceability and experimentation.  His sound is based on a small collection of vintage / modern synthesizers & drum machines.  Samples and field recordings lace deep grooves with textural variability.  Works range from techno and deep house to ambient and atmospheric."
},
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })