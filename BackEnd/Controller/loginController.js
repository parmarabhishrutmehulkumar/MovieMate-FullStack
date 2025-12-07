import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/User.js';

const loginuser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
        
        res.cookie('authtoken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.status(200).json({ 
            message: "Login successful", 
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

export default loginuser;
