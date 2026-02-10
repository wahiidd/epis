"use client";

import React, { useState, useContext, useEffect } from 'react';
import { GameContextAPI } from '../../../lib/context/GameContext';
import { useTimer } from '../../../lib/hooks/useTimer';
import { useGameLogic } from '../../../lib/hooks/useGameLogic';
import { playSound, stopSound } from '../../../lib/services/sound';
import '../../../styles/cards.css';

export default function CardModal() {
  const { state } = useContext(GameContextAPI);
  const { submitAnswer } = useGameLogic();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleTimeUp = () => {
    if (!showResult) {
      setShowResult(true);
      // Submit as incorrect answer (player will be moved back to previous square)
      submitAnswer(false, { playFeedback: false });
    }
  };

  const { timeLeft } = useTimer(20, handleTimeUp);

  if (!state.currentQuestion) return null;

  const question = state.currentQuestion;
  const isAnswered = selectedAnswer !== null;

  useEffect(() => {
    if (state.currentQuestion && state.currentQuestion.difficulty === 'risk') {
      playSound('question-risque.mp3');
    }
  }, [state.currentQuestion]);

  const handleAnswer = (index) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
      setShowResult(true);
      const isCorrect = question.options[index].isCorrect;

      // Stop all timer sounds immediately
      stopSound('10-secondes.wav');
      stopSound('chrono.mp3');

      if (isCorrect) {
        if (question.difficulty === 'risk') playSound('question-risque-bonne-reponse.wav');
        else playSound('bonne-reponse.wav');
      } else {
        if (question.difficulty === 'risk') playSound('question-risque-perte.mp3');
        else playSound('mauvaise-reponse.mp3');
      }

      submitAnswer(isCorrect, { playFeedback: false });
    }
  };

  useEffect(() => {
    if (timeLeft === 10) {
      playSound('10-secondes.wav');
      playSound('chrono.mp3', { loop: true });
    }
    if (timeLeft === 0) {
      stopSound('chrono.mp3');
      playSound('temps-ecoule.mp3');
    }
  }, [timeLeft]);

  useEffect(() => () => stopSound('chrono.mp3'), []);

  const isCorrect = selectedAnswer !== null && question.options[selectedAnswer].isCorrect;

  return (
    <div className="card-modal-overlay">
      <div className="card-modal">
        <div className="card-header">
          <span className={`difficulty-badge ${question.difficulty.toLowerCase()}`}>{question.difficulty.toUpperCase()}</span>
          <span className="timer">⏱️ {timeLeft}s</span>
        </div>

        <h3 className="question-text">{question.question}</h3>

        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                selectedAnswer === index ? (isCorrect ? 'correct' : 'incorrect') : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
            >
              {option.text}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div>{isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</div>
            {selectedAnswer !== null && (
              <div className="points-awarded">
                +{isCorrect ? (question.difficulty === 'easy' ? 1 : question.difficulty === 'medium' ? 3 : 5) : 0} points
              </div>
            )}
          </div>
        )}

        {!isAnswered && (
          <div className="card-footer">
            <small>Sélectionnez une réponse pour continuer</small>
          </div>
        )}
      </div>
    </div>
  );
}
