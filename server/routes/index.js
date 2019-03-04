const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Upload = require("../models/Upload");
const User = require("../models/User");
const uploader = require('../configs/cloudinary-audio');

router.post("/upload", uploader.single("upload_url"), (req, res, next) => {
  const { title, artist, album, year, genre, tags, upload_url, host, upload_img, upload_type } = req.body
  const newUpload = new Upload({ title, artist, album, year, genre, tags, upload_url, host, upload_img, upload_type, _created_by: req.user._id })

  if (req.file) {
    newUpload.upload_img = req.file.secure_url;
  }

  newUpload.save()
  .then((data) => {
    res.json(data);
  })
  .catch(error => {
    console.log(error)
  })

});

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then((data) => {
    res.json(data);
  })
  .catch(error => {
    console.log(error)
  })
});

router.get("/", (req, res, next) => {
  Upload.find()
    .then((data) => {
      res.json(data)
    })
    .catch(error => {
      console.log(error)
    })
});

module.exports = router;