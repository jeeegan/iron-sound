const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Upload = require("../models/Upload")
const User = require("../models/User")

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.post("/upload", (req, res, next) => {
  const { title, artist, album, year, genre, tags, embed_url, host, upload_img, upload_type } = req.body


  const newUpload = new Upload({ title, artist, album, year, genre, tags, embed_url, host, upload_img, upload_type, _created_by: req.user._id })
  console.log(newUpload)

  newUpload.save()
  .then((data) => {
    res.json(data);
  })
  .catch(error => {
    console.log(error)
  })
})

router.get("/profile/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then((data) => {
    res.json(data);
  })
  .catch(error => {
    console.log(error)
  })
}) 

module.exports = router;