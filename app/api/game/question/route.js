// GET /api/game/question
import { NextResponse } from 'next/server';
import { sampleQuestions } from '../../../../lib/data/sampleQuestions';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get('difficulty');
    
    if (!difficulty) {
      return NextResponse.json({ error: 'Difficulty required' }, { status: 400 });
    }

    // Filter questions by difficulty
    // 'random' picks from all questions
    let filtered = [];
    if (difficulty === 'random') {
      filtered = sampleQuestions;
    } else {
      filtered = sampleQuestions.filter(q => q.difficulty === difficulty.toLowerCase());
    }

    if (filtered.length === 0) {
      return NextResponse.json({ error: `No questions found for difficulty: ${difficulty}` }, { status: 404 });
    }

    // Pick a random question
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const question = filtered[randomIndex];

    return NextResponse.json(question);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
