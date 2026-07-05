import Level from '../models/Level.js';
import Lesson from '../models/Lesson.js';
import Progress from '../models/Progress.js';

export const getLevelsAndLessons = async (req, res) => {
  try {
    const [levels, lessons, progress] = await Promise.all([
      Level.find({}).sort({ order: 1 }),
      Lesson.find({}),
      Progress.find({ userId: req.user._id }).sort({ completedAt: -1 })
    ]);

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
    await Progress.deleteMany({ userId: req.user._id });
    res.json({ success: true, message: 'All progress reset successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
