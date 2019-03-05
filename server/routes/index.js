const express = require('express');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const Upload = require("../models/Upload");
const User = require("../models/User");
const uploader = require('../configs/cloudinary-audio');
const multer = require('multer')
const upload = multer()

router.post("/upload", uploader.single("upload_url"), (req, res, next) => {
  const { title, artist, album, year, genre, tags, upload_url, host, upload_img, upload_type } = req.body
  const newUpload = new Upload({ title, artist, album, year, genre, tags, upload_url, host, upload_img, upload_type, _created_by: req.user._id })

  if (req.file) {
    newUpload.upload_url = req.file.secure_url;
  }

  newUpload.save()
  .then((data) => {
    res.json(data);
  })
  .catch(error => {
    console.log(error)
  })

});

router.post('/update', uploader.none(), (req, res, next) => {
  const { display_name, location, bio, sc_url, bc_url, yt_url } = req.body;
  User.updateOne({display_name: display_name}, { display_name, location, bio, sc_url, bc_url, yt_url })
    .then(res => console.log(res))
    .catch(err)
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  User.findOne({ _id: req.user.id })
  .then((user) => {
    Upload.find({_created_by: user._id})
    .then(uploads => {
      res.json({
        user: user,
        uploads: uploads
      });
    })
  })
  .catch(error => {
    console.log(error)
  })
});

router.get("/profile/:displayname", (req, res, next) => {
  User.findOne({ display_name: req.params.displayname })
    .then((user) => {
      Upload.find({_created_by: user._id})
      .then(uploads => {
        res.json({
          user: user,
          uploads: uploads
        });
      })
    })
    .catch(error => {
      console.log(error)
    })
});

router.get("/track/:id", (req, res, next) => {
  Upload.findOne({ _id: req.params.id})
    .then(track => {
      res.json(track)
    })
    .catch(error => {
      console.log(error)
  })
})

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