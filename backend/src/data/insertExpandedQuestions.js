import mongoose from 'mongoose';
import Question from '../models/Question.js';
import { connectDB } from '../config/database.js';
import { expandedQuestions } from './expandedQuestions.js';

async function insertExpandedQuestions() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Count existing questions
    const existingCount = await Question.countDocuments();
    console.log(`📊 Existing questions in database: ${existingCount}`);

    // Transform expandedQuestions format to match Question schema
    const formattedQuestions = expandedQuestions.map(q => ({
      question: q.question,
      difficulty: q.difficulty,
      options: q.options,
      category: 'Epistemology',
      timeLimit: 20
    }));

    // Insert new questions
    const result = await Question.insertMany(formattedQuestions, { ordered: false });
    console.log(`✨ Successfully inserted ${result.length} new questions`);

    // Verify counts by difficulty
    const easyCounts = await Question.countDocuments({ difficulty: 'easy' });
    const mediumCounts = await Question.countDocuments({ difficulty: 'medium' });
    const hardCounts = await Question.countDocuments({ difficulty: 'hard' });
    const totalCounts = await Question.countDocuments();

    console.log(`\n📈 Question Distribution:`);
    console.log(`  Easy:   ${easyCounts} questions`);
    console.log(`  Medium: ${mediumCounts} questions`);
    console.log(`  Hard:   ${hardCounts} questions`);
    console.log(`  Total:  ${totalCounts} questions`);

    console.log(`\n✅ Database expansion complete!`);

    // Disconnect
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error inserting questions:', error.message);
    if (error.writeErrors) {
      console.error('Write errors:', error.writeErrors);
    }
    process.exit(1);
  }
}

insertExpandedQuestions();
