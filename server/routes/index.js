const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Upload = require("../models/Upload");
const User = require("../models/User");
const uploader = require('../configs/cloudinary-audio');
const uploaderImage = require('../configs/cloudinary-image');

router.put("/upload-track-image", uploaderImage.single("track_img"), (req, res, next) => {
  const { album } = req.body;

  if (req.file) {
    track_img = req.file.secure_url;
  }

  Upload.updateMany({ album: album }, {track_img})
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.post("/uploads", uploader.single("upload_url"), (req, res, next) => {
  const { title, artist, album, year, genre, upload_url, host, upload_img, upload_type } = req.body;
  const newUpload = new Upload({ title, artist, album, year, genre, upload_url, host, upload_img, upload_type, _created_by: req.user._id });

  if (req.file) {
    newUpload.upload_url = req.file.secure_url;
  };

  newUpload.save()
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.put('/profile', uploader.none(), (req, res, next) => {
  // When the user is connected, req.user is defined
  const { display_name, location, bio, sc_url, bc_url, yt_url, yt_embed_1, yt_embed_2, extendedBio, custom_url } = req.body;
  User.findByIdAndUpdate(req.user._id, { display_name, custom_url, location, bio, sc_url, bc_url, yt_url, yt_embed_1, yt_embed_2, extendedBio })
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.delete('/profile', isLoggedIn, (req, res, next) => {
  User.deleteOne({_id: req.user.id})
    .then(data =>  res.json(data))
    .catch(err => console.log(err));
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then((user) => {
      Upload.find({_created_by: user._id})
      .then(uploads => {
        res.json({ user: user, uploads: uploads});
    });
  })
    .catch(err => console.log(err));
});

router.get("/album/:name", (req, res, next) => {
  Upload.find({album: req.params.name})
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.get("/profile/:displayname", (req, res, next) => {
  User.findOne({ display_name: req.params.displayname })
    .then((user) => {
      Upload.find({_created_by: user._id})
        .then(uploads => {
          res.json({user: user, uploads: uploads});
    });
  })
    .catch(err => console.log(err));
});

router.get("/tracks/:id", (req, res, next) => {
  Upload.findOne({ _id: req.params.id})
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.delete("/tracks/:id", (req, res, next) => {
  Upload.deleteOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

router.get("/uploads", (req, res, next) => {
  Upload.find()
    .then((data) => res.json(data))
    .catch(err => console.log(err));
});

module.exports = router;