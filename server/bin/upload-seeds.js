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
    embed_url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/574077195&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    host: "sc",
    _created_by: "5c77e61ee8e56c780ea00115",
    upload_img: "",
    upload_type: "track"
},
{
  title: "Folding Stars",
  artist: "Biffy Clyro",
  album: "MTV Unplugged Live at Roundhouse, London",
  year: 2018,
  genre: "Rock",
  tags: [],
  embed_url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/443844570&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  host: "sc",
  _created_by: "5c77e61ee8e56c780ea00115",
  upload_img: "",
  upload_type: "track"
},
{
  title: "Diary Of Always (Electro​-​House Remix)",
  artist: "Dusk@Twilight / Biffy Clyro",
  album: "Crystal Empire Takeover EP",
  year: 2014,
  genre: "Electro/Rock",
  tags: [],
  embed_url: "https://bandcamp.com/EmbeddedPlayer/album=1669154490/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=1243447066/transparent=true/",
  host: "bc",
  _created_by: "5c77e61ee8e56c780ea00115",
  upload_img: "",
  upload_type: "track"
},
{
  title: "27",
  artist: "Mind Overtime",
  album: "Sent Weeping EP",
  year: 2002,
  genre: "Rock",
  tags: [],
  embed_url: "https://bandcamp.com/EmbeddedPlayer/album=137239073/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=499624580/transparent=true/" ,
  host: "bc",
  _created_by: "5c77e61ee8e56c780ea00115",
  upload_img: "",
  upload_type: "track"
},
{
  title: "I Feel It Coming (feat. Daft Punk)",
  artist: "The Weekend",
  album: "Starboy",
  year: 2017,
  genre: "Electro",
  tags: [],
  embed_url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293178649&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" ,
  host: "sc",
  _created_by: "5c77e8e1f3526c79799c2509",
  upload_img: "",
  upload_type: "track"
},
{
  title: "27",
  artist: "Mind Overtime",
  album: "Sent Weeping EP",
  year: 2002,
  genre: "Rock",
  tags: [],
  embed_url: "https://bandcamp.com/EmbeddedPlayer/track=48960990/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/",
  host: "bc",
  _created_by: "5c77e8e1f3526c79799c2509",
  upload_img: "",
  upload_type: "track"
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