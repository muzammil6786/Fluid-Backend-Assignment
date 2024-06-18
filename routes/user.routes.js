const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { pass } = req.body;
    try {
      bcrypt.hash(pass, 5, async (err, hash) => {
        try {
          if (hash) {
            const user = new UserModel({ ...req.body, pass: hash });
            await user.save();
            res.status(200).send({ msg: "New new has been register " });
          } else {
            res.status(400).send({ msg: err });
          }
        } catch (err) {
          res.status(400).send({ msg: err });
        }
      });
    } catch (err) {
      res.status(400).send({ msg: err });
    }
  });
  
  userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const accessToken = jwt.sign(
            { userID: user._id },
            process.env.accesstokenKey,
            { expiresIn: process.env.accesstokenKeyExp }
          );
          const refreshToken = jwt.sign(
            { userID: user._id },
            process.env.refreshTokenKey,
            { expiresIn: process.env.refreshTokenKeyExp }
          );
          res.cookie("token", accessToken);
          res.status(200).send({
            msg: "Login Sucessful..!",
            accessToken,
            refreshToken,
          });
        } else {
          res.status(200).send({ msg: "User Does not exist, please register" });
        }
      });
    } catch (err) {
      res.status(400).send({ msg: err });
    }
  });



module.exports = {
  userRouter,
};