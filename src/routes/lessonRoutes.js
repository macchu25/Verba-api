import express from 'express';
import { getLessonById, submitTranslation } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/:id', getLessonById);
router.post('/:id/submit', submitTranslation);

export default router;
