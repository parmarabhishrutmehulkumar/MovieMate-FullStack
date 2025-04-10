import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/User.js";

const homeController = async (req, res) => {
  res.send("Hello");
};

export default homeController;
