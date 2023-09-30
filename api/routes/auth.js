const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const googleOAuth = require("../utils/googleOAuth");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await User.findOne({ username });
    if (!userExist) {
      const userDoc = await User.create({
        username,
        password: bcrypt.hashSync(password, salt),
      });
      res.status(201).json(userDoc);
    } else {
      res.status(400).json("Username already token!");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

router.post("/api/auth/google", async (req, res) => {
  try {
    const code = req.body.code;
    const profile = await googleOAuth.getProfileInfo(code);
    // console.log(profile);
    const userExist = await User.findOne({ username: profile.name });
    if (!userExist) {
      const userDoc = await User.create({
        username: profile.name,
        password: bcrypt.hashSync(profile.sub, salt),
      });
      if (userDoc) {
        jwt.sign(
          { username: profile.name, id: userDoc._id },
          process.env.secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              id: userDoc._id,
              username: userDoc.username,
            });
          }
        );
      }
    } else {
      const userDoc = await User.findOne({ username: profile.name });
      const passOk = bcrypt.compareSync(profile.sub, userDoc.password);
      if (passOk) {
        // logged in
        jwt.sign(
          { username: profile.name, id: userDoc._id },
          process.env.secret,
          {},
          (err, token) => {
            if (err) throw err;
            res.status(200).cookie("token", token).json({
              id: userDoc._id,
              username: userDoc.username,
            });
          }
        );
      }
    }
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userDoc = await User.findOne({ username });
  var passOk;
  if (userDoc) {
    passOk = bcrypt.compareSync(password, userDoc.password);
  }
  if (passOk) {
    // logged in
    jwt.sign(
      { username, id: userDoc._id },
      process.env.secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("wrong credentials");
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

router.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
});

module.exports = router;
