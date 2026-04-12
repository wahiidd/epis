// GET /api/game/question
import { NextResponse } from 'next/server';


import { sampleQuestions } from '../../../../backend/src/data/sampleQuestions';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get('difficulty');
    if (!difficulty) {
      return NextResponse.json({ error: 'Difficulty required' }, { status: 400 });
    }
    // Filter questions by difficulty
    const filtered = sampleQuestions.filter(q => q.difficulty === difficulty || (difficulty === 'random' && q.difficulty));
    if (!filtered.length) {
      return NextResponse.json({ error: 'No questions found' }, { status: 404 });
    }
    // Pick a random question
    const question = filtered[Math.floor(Math.random() * filtered.length)];
    return NextResponse.json(question);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
