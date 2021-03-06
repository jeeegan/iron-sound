const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploader = require('../configs/cloudinary-image');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", uploader.single("user_img"), (req, res, next) => {
  const { password, email, display_name, bc_url, sc_url, yt_url, custom_url, bio, location, yt_embed_1, yt_embed_2, extendedBio } = req.body;

  if (req.file) {
    user_img = req.file.secure_url;
  } else {
    user_img = null;
  }

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The email already exists" });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({ password: hashPass, email, display_name, bc_url, sc_url, yt_url, custom_url, bio, user_img, location,  yt_embed_1, yt_embed_2, extendedBio});
      return newUser.save();
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json( userSaved );
      });
    })
    .catch(err => next(err))
});

router.get('/loggedin', (req, res, next) => {
  if(req.user) {
    res.json(req.user);
  }
  else {
    res.json({});
  }
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // first check to see if there's a document with that email
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Incorrect email "));
        return;
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error("Password is wrong"));
        return;
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined;
        res.json(userDoc);
      })
    })
    .catch(err => next(err))
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: 'You are out!' });
})

module.exports = router;
