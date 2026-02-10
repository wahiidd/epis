import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: true, unique: true },
    mode: { type: String, enum: ['solo', 'team'], required: true },
    players: [
      {
        playerId: { type: String, required: true },
        name: { type: String, required: true },
        score: { type: Number, default: 0 },
        position: { type: Number, default: 0 }
      }
    ],
    currentPlayer: { type: Number, default: 0 },
    boardState: [{ type: String }],
    askedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model('GameSession', gameSessionSchema);
