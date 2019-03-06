const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Upload = require("../models/Upload");
const User = require("../models/User");
const uploader = require('../configs/cloudinary-audio');
const multer = require('multer')

router.post("/upload", uploader.single("upload_url"), (req, res, next) => {
  const { title, artist, album, year, genre, tags, upload_url, host, upload_img, upload_type } = req.body;
  const newUpload = new Upload({ title, artist, album, year, genre, tags, upload_url, host, upload_img, upload_type, _created_by: req.user._id });

  if (req.file) {
    newUpload.upload_url = req.file.secure_url;
  };

  newUpload.save()
    .then(data => res.json(data))
    .catch(console.log);
});

router.put('/update', uploader.none(), (req, res, next) => {
  const { display_name, location, bio, sc_url, bc_url, yt_url } = req.body;
  User.updateOne({display_name: display_name}, { display_name, location, bio, sc_url, bc_url, yt_url })
    .then(data => res.json(data))
    .catch(console.log);
});

router.delete('/profile/delete', isLoggedIn, (req, res, next) => {
  User.deleteOne({_id: req.user.id})
    .then(data =>  res.json(data))
    .catch(console.log);
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findOne({ _id: req.user.id })
    .then((user) => {
      Upload.find({_created_by: user._id})
      .then(uploads => {
        res.json({ user: user, uploads: uploads});
    });
  })
    .catch(console.log);
});

router.get("/profile/:displayname", (req, res, next) => {
  User.findOne({ display_name: req.params.displayname })
    .then((user) => {
      Upload.find({_created_by: user._id})
        .then(uploads => {
          res.json({user: user, uploads: uploads});
    });
  })
    .catch(console.log);
});

router.get("/track/:id", (req, res, next) => {
  Upload.findOne({ _id: req.params.id})
    .then(data => res.json(data))
    .catch(console.log);
});

router.delete("/track/delete/:id", (req, res, next) => {
  Upload.deleteOne({_id: req.params.id})
    .then(data => res.json(data))
    .catch(console.log);
});

router.get("/", (req, res, next) => {
  Upload.find()
    .then((data) => res.json(data))
    .catch(console.log);
});

module.exports = router;