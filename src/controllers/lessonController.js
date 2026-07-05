import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';
import { evaluateTranslation } from '../utils/evaluator.js';

export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }
    res.json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const submitTranslation = async (req, res) => {
  try {
    const { id } = req.params;
    const { userTranslation, direction } = req.body;

    if (!userTranslation || typeof userTranslation !== 'string') {
      return res.status(400).json({ success: false, error: 'User translation must be a non-empty string' });
    }

    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }

    const referenceText = direction === 'en-to-vi' ? lesson.vietnameseText : lesson.englishText;
    const keywords = direction === 'en-to-vi' ? lesson.keywordsVi : lesson.keywordsEn;

    // Evaluate
    const evaluation = evaluateTranslation(userTranslation, referenceText, keywords);

    // Save Progress
    const progress = await Progress.create({
      lessonId: lesson._id,
      direction,
      userTranslation,
      score: evaluation.score,
      feedback: {
        matchedKeywords: evaluation.matchedKeywords,
        missingKeywords: evaluation.missingKeywords,
        normalizedUser: evaluation.cleanedUser,
        normalizedRef: evaluation.cleanedRef
      }
    });

    res.json({
      success: true,
      score: evaluation.score,
      components: evaluation.components,
      refWordMatchStatus: evaluation.refWordMatchStatus,
      userWordMatchStatus: evaluation.userWordMatchStatus,
      matchedKeywords: evaluation.matchedKeywords,
      missingKeywords: evaluation.missingKeywords,
      referenceText,
      progressId: progress._id
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
