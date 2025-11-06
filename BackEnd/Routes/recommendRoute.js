import express from 'express';
const router = express.Router();
import { getRecommendations } from '../Controller/recommendController.js';

router.post("/recommend", getRecommendations);

export default router;