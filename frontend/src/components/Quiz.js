import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Quiz = ({ quiz, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = quiz.reduce((acc, q, index) => {
    return acc + (selectedAnswers[index] === q.answer ? 1 : 0);
  }, 0);

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, width: '400px' }}>
      <Typography variant="h5">Quiz</Typography>
      
      {quiz.map((q, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body1">{q.question}</Typography>
          {q.options.map((option, idx) => {
            const isSelected = selectedAnswers[index] === option;
            const isCorrect = option === q.answer;
            const isIncorrect = submitted && !isCorrect && selectedAnswers[index] === option;

            return (
              <Button
                key={idx}
                variant="outlined"
                onClick={() => handleSelect(index, option)}
                sx={{
                  m: 1,
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'white' : 'black',
                  borderColor: isIncorrect ? 'red' : 'default',
                  ...(isIncorrect && { bgcolor: 'rgba(255, 0, 0, 0.1)' }), // Light red background for wrong answers
                  ...(submitted && isCorrect && { borderColor: 'green' }) // Green border for correct answers
                }}
              >
                {option}
              </Button>
            );
          })}
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 1 }}>
        Submit
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Close
      </Button>

      {submitted && (
        <Box mt={2}>
          <Typography variant="h6">Your Score: {score} out of {quiz.length}</Typography>
          <Typography variant="body2" color="textSecondary">
            {score < quiz.length ? "Check the wrong answers highlighted in red." : "Great job!"}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;