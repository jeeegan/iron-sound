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
    email: "biffyclyro@email.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    display_name: "Biffy",
    bc_url: "https://bandcamp.com/tag/biffy-clyro",
    sc_url: "https://soundcloud.com/biffyclyro",
    yt_url: "https://www.youtube.com/biffyclyro",
    custom_url: "https://www.biffyclyro.com",
    bio: "Biffy Clyro are a Scottish rock band that formed in Kilmarnock, East Ayrshire, composed of Simon Neil (guitar, lead vocals), James Johnston (bass, vocals) and Ben Johnston (drums, vocals). Currently signed to 14th Floor Records, they have released seven studio albums, four of which (Puzzle, Only Revolutions, Opposites and Ellipsis) reached the top five in the UK Albums Chart, with their sixth studio album, Opposites claiming their first UK number-one album. After their first three albums, the band expanded their following significantly in 2007 with the release of their fourth, Puzzle, creating more mainstream songs with simpler rhythms and distancing themselves from the more unusual dissonant style that was present in their previous three albums. Puzzle peaked at number 2 on the official UK album charts on 16 June 2007. The album went Gold in the UK, selling over 100,000 units, and later in 2012 went Platinum in the UK, having sold over 300,000 copies.Biffy Clyro are a Scottish rock band that formed in Kilmarnock, East Ayrshire,[2] composed of Simon Neil (guitar, lead vocals), James Johnston (bass, vocals) and Ben Johnston (drums, vocals). Currently signed to 14th Floor Records, they have released seven studio albums, four of which (Puzzle, Only Revolutions, Opposites and Ellipsis) reached the top five in the UK Albums Chart, with their sixth studio album, Opposites claiming their first UK number-one album.[3] After their first three albums, the band expanded their following significantly in 2007 with the release of their fourth, Puzzle, creating more mainstream songs with simpler rhythms and distancing themselves from the more unusual dissonant style that was present in their previous three albums. Puzzle peaked at number 2 on the official UK album charts on 16 June 2007. The album went Gold in the UK, selling over 100,000 units, and later in 2012 went Platinum in the UK, having sold over 300,000 copies.",
    location: "Scotland",
    user_img: "",
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