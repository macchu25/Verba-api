import express from 'express';
import { getLessonById, submitTranslation } from '../controllers/lessonController.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.get('/:id', protect, getLessonById);
router.post('/:id/submit', protect, submitTranslation);

export default router;
