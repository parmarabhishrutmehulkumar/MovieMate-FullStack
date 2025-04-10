import express from 'express';
const router = express.Router();

import registerController from '../Controller/registerController.js';
import bcrypt from 'bcrypt';
import userModel from '../Models/User.js';
import jwt from 'jsonwebtoken';

router.post('/',registerController);

export default router;  