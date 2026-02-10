import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    playerId: { type: String, required: true },
    playerName: { type: String, required: true },
    gameId: { type: String, required: true },
    finalScore: { type: Number, required: true },
    rank: { type: Number },
    mode: { type: String, enum: ['solo', 'team'] },
    questionsAnswered: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Score', scoreSchema);
