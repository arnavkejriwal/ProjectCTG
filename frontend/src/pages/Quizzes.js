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
import Questionnaire from '../components/Questionnaire';

const questions = [
  {
    question: "1. Little interest or pleasure in doing things?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "2. Feeling down, depressed, or hopeless?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "3. Trouble falling or staying asleep, or sleeping too much?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "4. Feeling tired or having little energy?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "5. Poor appetite or overeating?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "6. Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "7. Trouble concentrating on things, such as reading the newspaper or watching television?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "8. Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
  {
    question: "9. Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
    options: ["Not at all", "Several Days", "More than Half the Days", "Nearly Every Day"],
  },
];

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
  "Patient Health Questionnaire-9 (PHQ-9)": {
    description: "PHQ-9 is a self-administered, 9-question instrument to screen for depression",
  },
};

const QuizzesPage = () => {
  const [openQuiz, setOpenQuiz] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const handleQuestionOpen = () => {
    setOpen(true);
  };

  const handleQuestionClose = () => {
    setOpen(false);
  };

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
    <Typography variant="h5" sx={{ my: 4 }}>Mental Health Questionnaires</Typography>

    <Modal open={Boolean(openQuiz)} onClose={handleClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Quiz quiz={openQuiz} onClose={handleClose} />
      </Box>
    </Modal>

    {Object.entries(quizzes).filter(([title]) => title.includes("Patient Health")).map(([title, { description, questions }]) => (
      <Paper key={title} elevation={3} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="body1" gutterBottom>{description}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleQuestionOpen()} 
          sx={{ my: 2 }}
        >
          Start Questionnaire
        </Button>
      </Paper>
    ))}

      <Modal open={open} onClose={handleQuestionClose}>
        <Box sx={{
          width: '800px',
          maxHeight: '80%',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          mx: 'auto', // Center the modal
          mt: '100px', // Add some top margin
        }}>
          <Questionnaire questions={questions} onClose={handleQuestionClose} />
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