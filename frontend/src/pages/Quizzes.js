import Quiz from "../components/Quiz";
import React from 'react';

const Quizzes = () => {
    const quizzes = [
      {
        id: 1,
        title: 'React Fundamentals',
        description: 'Test your understanding of React basics.',
        image: 'react-quiz.jpg',
      },
      {
        id: 2,
        title: 'JavaScript Algorithms',
        description: 'Solve coding challenges to improve your JavaScript skills.',
        image: 'js-quiz.jpg',
      },
      {
        id: 3,
        title: 'CSS Positioning',
        description: 'Understand CSS layout and positioning techniques.',
        image: 'css-quiz.jpg',
      },
    ];
  
    return (
      <div className="quiz-page">
        <h2>Available Quizzes</h2>
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <Quiz key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Quizzes;