import Level from '../models/Level.js';
import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';

export const getLevelsAndLessons = async (req, res) => {
  try {
    const levels = await Level.find({}).sort({ order: 1 });
    const lessons = await Lesson.find({});
    const progress = await Progress.find({}).sort({ completedAt: -1 });

    res.json({
      success: true,
      levels,
      lessons,
      progress
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const resetProgress = async (req, res) => {
  try {
    await Progress.deleteMany({});
    res.json({ success: true, message: 'All progress reset successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
