import mongoose from 'mongoose';
import Question from '../models/Question.js';
import { sampleQuestions } from './sampleQuestions.js';
import dotenv from 'dotenv';

dotenv.config();

async function insertQuestions() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/epistemia';
    await mongoose.connect(mongoURI);
    console.log('📦 Connected to MongoDB');
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing questions');
    
    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log(`✅ Inserted ${sampleQuestions.length} sample questions`);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

insertQuestions();
