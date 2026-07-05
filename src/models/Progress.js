import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  direction: { type: String, enum: ['en-to-vi', 'vi-to-en'], required: true },
  userTranslation: { type: String, required: true },
  score: { type: Number, required: true },
  feedback: {
    matchedKeywords: [{ type: String }],
    missingKeywords: [{ type: String }],
    normalizedUser: { type: String },
    normalizedRef: { type: String }
  },
  completedAt: { type: Date, default: Date.now }
});

const Progress = mongoose.model('Progress', ProgressSchema);
export default Progress;
