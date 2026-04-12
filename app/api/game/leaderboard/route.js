// GET /api/game/leaderboard
import { NextResponse } from 'next/server';

import { gameSessions } from '../../../../lib/api/gameSessions';

export async function GET() {
  try {
    // Get all completed game sessions and extract scores
    const allScores = [];
    for (const [gameId, session] of gameSessions.entries()) {
      if (session.status === 'completed') {
        session.players.forEach(player => {
          allScores.push({
            playerName: player.name,
            finalScore: player.score,
            gameId: session.gameId,
            mode: session.mode
          });
        });
      }
    }
    // Sort by score and limit to top 10
    const leaderboard = allScores.sort((a, b) => b.finalScore - a.finalScore).slice(0, 10);
    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
