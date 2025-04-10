import express from 'express';
const router1 = express.Router();
import auth from '../Middleware/auth.js';

import loginController from '../Controller/loginController.js';
import homeController from '../Controller/homeController.js';

router1.post('/',loginController);

router1.get('/home',auth,homeController);
export default router1;