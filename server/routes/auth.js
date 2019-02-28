const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploader = require('../configs/cloudinary-setup');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", uploader.single("user_img"), (req, res, next) => {
  const { password, email, display_name, bc_url, sc_url, yt_url, custom_url, bio, location } = req.body;

  if (req.file) {
    user_img = req.file.secure_url;
  }

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The email already exists" });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({ password: hashPass, email, display_name, bc_url, sc_url, yt_url, custom_url, bio, user_img, location });
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
    res.status(200).json(req.user);
  }
  else {
    next({ status: 403, message: 'Unauthorized' });
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

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.json(req.user);
    })
  })(req, res, next)
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: 'You are out!' });
})

module.exports = router;
