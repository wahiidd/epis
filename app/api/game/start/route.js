// POST /api/game/start
import { NextResponse } from 'next/server';
import { generateBoard } from '../../../../lib/utils/gameEngine';


export async function POST(req) {
  try {
    const { mode, players } = await req.json();
    if (!mode || !players || players.length === 0) {
      return NextResponse.json({ error: 'Mode and players required' }, { status: 400 });
    }
    const gameId = `game_${Date.now()}`;
    const boardSquares = generateBoard();
    // Add playerId and score to each player
    const playersWithId = players.map((p, idx) => ({
      ...p,
      playerId: p.playerId || `p${idx + 1}`,
      score: p.score || 0
    }));
    // Removed gameSessions usage. Add your own session storage or database logic here if needed.
    return NextResponse.json({ success: true, gameId, boardSquares, players: playersWithId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
