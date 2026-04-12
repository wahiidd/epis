// POST /api/game/end
import { NextResponse } from 'next/server';

import { gameSessions } from '../../../../lib/api/gameSessions';

export async function POST(req) {
  try {
    const { gameId } = await req.json();
    const gameSession = gameSessions.get(gameId);
    if (!gameSession) {
      return NextResponse.json({ error: 'Game session not found' }, { status: 404 });
    }
    gameSession.status = 'completed';
    gameSession.completedAt = new Date();
    // Sort players by score
    const sortedPlayers = [...gameSession.players].sort((a, b) => b.score - a.score);
    return NextResponse.json({ success: true, ranking: sortedPlayers });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
