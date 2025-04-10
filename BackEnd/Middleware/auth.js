import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies['authtoken']; 
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        const user = await userModel.findById(decoded.id);  
        console.log(user);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

export default auth;
