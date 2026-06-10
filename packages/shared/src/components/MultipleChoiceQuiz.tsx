import React, { useState } from 'react';
import { Content } from '../types/schema';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

interface MultipleChoiceQuizProps {
  questions: QuizQuestion[];
  contentData?: Content;
  onComplete: (score: number) => void;
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ questions, contentData, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (index: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (index === currentQuestion.correctOptionIndex) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate final score percentage
      const finalScore = Math.round(((score + (index === currentQuestion.correctOptionIndex ? 1 : 0)) / questions.length) * 100);
      onComplete(finalScore);
    }
  };

  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="multiple-choice-container">
      <h2>Multiple Choice Quiz</h2>
      {contentData && <p>Context: {contentData.title}</p>}
      
      <div className="question-block">
        <h3>{currentQuestion.question}</h3>
        <div className="options-list">
          {currentQuestion.options.map((option, index) => (
            <button 
              key={index} 
              className="quiz-option-button"
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="progress">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
    </div>
  );
};
