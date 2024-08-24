import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';

const quizzes = {
  "Cantonese Basics": {
    description: "Learn the essential phrases and common words used in everyday Cantonese conversations.",
    questions: [
      { question: "What is the Cantonese word for 'hello'?", options: ["你好", "再見", "多謝"], answer: "你好" },
      { question: "What is the Cantonese word for 'thank you'?", options: ["多謝", "對唔住", "歡迎"], answer: "多謝" },
    ],
  },
  "Cantonese Food Vocabulary": {
    description: "Expand your vocabulary with words related to food and dining in Cantonese.",
    questions: [
      { question: "What is the Cantonese word for 'rice'?", options: ["米飯", "麵", "湯"], answer: "米飯" },
      { question: "What is the Cantonese word for 'water'?", options: ["水", "酒", "茶"], answer: "水" },
    ],
  },

// New Mental Health Quizzes Section
"Mental Health Awareness": {
  description: "Test your knowledge about mental health and wellness.",
  questions: [
    { question: "What is a common symptom of depression?", options: ["Increased energy", "Persistent sadness", "Euphoria"], answer: "Persistent sadness" },
    { question: "What does CBT stand for?", options: ["Cognitive Behavioral Therapy", "Crisis Behavioral Therapy", "Cognitive Biochemical Therapy"], answer: "Cognitive Behavioral Therapy" },
  ],
},
};

const QuizzesPage = () => {
const [openQuiz, setOpenQuiz] = useState(null);
const [snackbarOpen, setSnackbarOpen] = useState(false);

const handleOpen = (quiz) => {
  setOpenQuiz(quiz);
};

const handleClose = () => {
  setOpenQuiz(null);
  setSnackbarOpen(true);
};

const handleSnackbarClose = () => {
  setSnackbarOpen(false);
};

return (
  <Container>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', my: 2 }}>
      Quizzes
    </Typography>
    
    {/* Cantonese Quizzes Section */}
    <Typography variant="h5" sx={{ my: 4 }}>Cantonese Quizzes</Typography>
    {Object.entries(quizzes).filter(([title]) => title.includes("Cantonese")).map(([title, { description, image, questions }]) => (
      <Paper key={title} elevation={3} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body1" gutterBottom>{description}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpen(questions)} 
          sx={{ my: 2 }}
        >
          Start Quiz
        </Button>
      </Paper>
    ))}

    {/* Mental Health Quizzes Section */}
    <Typography variant="h5" sx={{ my: 4 }}>Mental Health Quizzes</Typography>
    {Object.entries(quizzes).filter(([title]) => title.includes("Mental Health")).map(([title, { description, image, questions }]) => (
      <Paper key={title} elevation={3} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body1" gutterBottom>{description}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpen(questions)} 
          sx={{ my: 2 }}
        >
          Start Quiz
        </Button>
      </Paper>
    ))}

    <Modal open={Boolean(openQuiz)} onClose={handleClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Quiz quiz={openQuiz} onClose={handleClose} />
      </Box>
    </Modal>

    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity="success">
        Quiz closed successfully!
      </Alert>
    </Snackbar>
  </Container>
);
};

export default QuizzesPage;