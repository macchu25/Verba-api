import express from 'express';
import { getLevelsAndLessons, resetProgress } from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getLevelsAndLessons);
router.delete('/', resetProgress);

export default router;
