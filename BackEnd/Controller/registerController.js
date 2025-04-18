import userModel from "../Models/User.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);
                               
  try {
    const UserExist = await userModel.findOne({ email: email });
    if (UserExist) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,

    });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default registerController;
