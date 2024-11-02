import { response } from "express";
import User from "../models/user.model.js";

const getUsers = async (req, res) => {
  try{
    const users = await User.find({}, 'username');
    res.status(200).json(users);
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

export default getUsers;