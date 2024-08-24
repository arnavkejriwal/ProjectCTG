import React from 'react';

export default function Quiz({ quiz }){
  return (
    <div className="quiz-card">
      <img src={quiz.image} alt={quiz.title} className="quiz-image" />
      <div className="quiz-content">
        <h3 className="quiz-title">{quiz.title}</h3>
        <p className="quiz-description">{quiz.description}</p>
        <button className="quiz-button">Take Quiz</button>
      </div>
    </div>
  );
};
