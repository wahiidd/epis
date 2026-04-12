// POST /api/game/answer
import { NextResponse } from 'next/server';

import { gameSessions } from '../../../../lib/api/gameSessions';

function calculatePoints(difficulty, isCorrect, bet) {
  // Placeholder logic
  if (!isCorrect) return 0;
  let base = difficulty === 'hard' ? 30 : difficulty === 'medium' ? 20 : 10;
  return base + (bet || 0);
}

export async function POST(req) {
  try {
    const { gameId, playerId, difficulty, isCorrect, bet } = await req.json();
    const points = calculatePoints(difficulty, isCorrect, bet);
    const gameSession = gameSessions.get(gameId);
    if (!gameSession) {
      return NextResponse.json({ error: 'Game session not found' }, { status: 404 });
    }
    const player = gameSession.players.find(p => p.playerId === playerId);
    if (player) {
      player.score = (player.score || 0) + points;
    }
    return NextResponse.json({ success: true, pointsEarned: points, newScore: player?.score });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
