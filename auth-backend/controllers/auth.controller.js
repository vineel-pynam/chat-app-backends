import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hashSync(password, 10);
    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(400).send("User already exists");
    }else {
      const user = new User({
        username,
        password: hashPassword
      });
      generateTokenAndSetCookie(user._id, res);
      await user.save();
      res.status(201).json("User created successfully");
    }

  } catch (error) {
    res.status(400).json("User creation failed");
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(401).send("Unauthorized...!");
    }else {
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if (!isPasswordValid) {
        return res.status(401).send("Username/Password is incorrect");
      }
      generateTokenAndSetCookie(findUser._id, res);
      res.status(201).json({_id: findUser._id, username: findUser.username});
    }

  } catch (error) {
    res.status(400).json("Login failed");
  }
}
