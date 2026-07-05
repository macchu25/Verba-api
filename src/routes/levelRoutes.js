import express from 'express';
import { getLevelsAndLessons, resetProgress } from '../controllers/levelController.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.get('/', protect, getLevelsAndLessons);
router.delete('/', protect, resetProgress);

export default router;
