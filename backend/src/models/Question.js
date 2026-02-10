import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard', 'random'], required: true },
    options: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
      }
    ],
    timeLimit: { type: Number, default: 20 },
    category: { type: String, default: 'Epistemology' },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);
