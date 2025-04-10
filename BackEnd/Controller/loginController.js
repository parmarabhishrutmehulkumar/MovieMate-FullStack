import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/User.js';

const loginuser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
        
       
        res.cookie('authtoken', token);

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export default loginuser;
