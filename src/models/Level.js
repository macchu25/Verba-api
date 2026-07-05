import mongoose from 'mongoose';

const LevelSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // A1, A2, B1, B2, C1
  name: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true }
});

const Level = mongoose.model('Level', LevelSchema);
export default Level;
