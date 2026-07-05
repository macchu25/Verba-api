import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  levelCode: { type: String, required: true, index: true }, // "A1", "A2", "B1", "B2", "C1"
  englishText: { type: String, required: true },
  vietnameseText: { type: String, required: true },
  keywordsEn: [{ type: String }],
  keywordsVi: [{ type: String }],
  vocabulary: [
    {
      word: { type: String, required: true },
      ipa: { type: String },
      meaning: { type: String, required: true },
      example: { type: String }
    }
  ],
  grammar: [
    {
      structure: { type: String, required: true },
      explanation: { type: String, required: true },
      example: { type: String }
    }
  ]
});

const Lesson = mongoose.model('Lesson', LessonSchema);
export default Lesson;
