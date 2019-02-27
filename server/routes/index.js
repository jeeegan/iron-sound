const express = require('express')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()
const Upload = require("../models/Upload")

router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.post("/upload", (req, res, next) => {
  const { title, artist, album, genre, tags, embed_url, host, upload_img, upload_type } = req.body

  const newUpload = new Upload({ title, artist, album,    genre, tags, embed_url, host, upload_img, upload_type })

  newUpload.save()
  .then(() => {
    res.redirect('/')
  })
})

module.exports = router;