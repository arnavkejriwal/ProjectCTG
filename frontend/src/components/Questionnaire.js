import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

const Questionnaire = ({ questions, onClose }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSelect = (questionIndex, option) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionIndex]: option,
      }));
      setError(false); // Clear error when answering
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      setError(true);
      return; // Prevent submission if not all questions are answered
    }
    
    setSubmitted(true);
  };

  // Scoring logic based on selected answers
  const score = Object.values(selectedAnswers).reduce((acc, answer) => {
    switch (answer) {
      case "Not at all":
        return acc + 0;
      case "Several Days":
        return acc + 1;
      case "More than Half the Days":
        return acc + 2;
      case "Nearly Every Day":
        return acc + 3;
      default:
        return acc;
    }
  }, 0);

  const getSeverity = (score) => {
    if (score <= 4) return { level: "Minimal Depression", description: "No significant symptoms. Keep maintaining your mental health!"};
    if (score <= 9) return { level: "Mild Depression", description: "You may have mild depression symptoms; try to go for a walk to relax yourself. Talk to your friends and family about your feelings. Repeat this questionnaire at follow-up" };
    if (score <= 14) return { level: "Moderate Depression", description: "You may have moderate symptoms that may affect daily activities. Seek assistance from, e.g., a social worker or counsellor; try to go for a walk to relax yourself. Talk to your friends and family about your feelings." };
    if (score <= 19) return { level: "Moderately Severe Depression", description: "More severe symptoms; please seek advice from a doctor and a social worker as soon as possible." };
    else return { level: "Severe Depression", description: "You may have severe symptoms; Immediate initiation of pharmacotherapy may be necessary, please seek advice from a doctor and a social worker as soon as possible." };
  };

  const severity = submitted ? getSeverity(score) : null;

  return (
    <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Over the past 2 weeks, how often have you been bothered by any of the following problems?
      </Typography>

      {questions.map((q, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body1" sx={{mb:1}}>{q.question}</Typography>
          {q.options.map((option, idx) => {
            const isSelected = selectedAnswers[index] === option;

            return (
              <Button
                key={idx}
                variant="outlined"
                onClick={() => handleSelect(index, option)}
                disabled={submitted} // Disable buttons after submission
                sx={{
                  m: 1,
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'white' : 'black',
                }}
              >
                {option}
              </Button>
            );
          })}
        </Box>
      ))}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Please answer all questions before submitting.
        </Alert>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 1, mt: 2 }}>
        Submit
      </Button>
      <Button variant="outlined" onClick={onClose} sx={{ mr: 1, mt: 2 }}>
        Close
      </Button>

      {submitted && (
        <Box mt={2}>
          <Typography variant="h6">Your Score: {score} out of {questions.length * 3}</Typography>
          <Typography variant="body2" color="textSecondary">
            Severity: {severity.level}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {severity.description}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Questionnaire;