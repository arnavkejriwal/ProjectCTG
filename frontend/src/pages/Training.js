import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  Snackbar,
  Alert,
  Paper,
  Grid,
} from '@mui/material';
import Quiz from '../components/Quiz';

const quizzes = {
  "Training Video Test": {
    description: "Test your knowledge from the video content",
    video: "https://www.youtube.com/embed/VIDEO_ID_1",
    questions: [
      { question: "What is a common symptom of depression?", options: ["Increased energy", "Persistent sadness", "Euphoria"], answer: "Persistent sadness" },
      { question: "What does CBT stand for?", options: ["Cognitive Behavioral Therapy", "Crisis Behavioral Therapy", "Cognitive Biochemical Therapy"], answer: "Cognitive Behavioral Therapy" },
    ],
  },
  "First Aid Training": {
    description: "Assess your knowledge on first aid procedures.",
    video: "https://www.youtube.com/embed/VIDEO_ID_2",
    questions: [
      { question: "What is the first step in CPR?", options: ["Check for responsiveness", "Call for help", "Start chest compressions"], answer: "Check for responsiveness" },
      { question: "Which of the following is a sign of a heart attack?", options: ["Chest pain", "Nausea", "Both"], answer: "Both" },
    ],
  },
  "Cultural Sensitivity Training": {
    description: "Test your understanding of cultural sensitivity and awareness.",
    video: "https://www.youtube.com/embed/VIDEO_ID_3",
    questions: [
      { question: "What is cultural sensitivity?", options: ["Ignoring cultural differences", "Understanding and respecting cultural differences", "Promoting one culture over another"], answer: "Understanding and respecting cultural differences" },
      { question: "Why is cultural competence important?", options: ["It helps avoid misunderstandings", "It is not important", "It promotes stereotypes"], answer: "It helps avoid misunderstandings" },
    ],
  },
};

const TrainingPage = () => {
  const [openQuiz, setOpenQuiz] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleOpen = (quiz) => {
    setOpenQuiz(quiz);
  };
  
  const handleClose = () => {
    setOpenQuiz(null);
    setSnackbarOpen(true);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5', my: 4 }}>
        Volunteer Training
      </Typography>

      <Grid container spacing={4}>
        {Object.entries(quizzes).map(([title, { description, video, questions }]) => (
          <Grid item xs={12} md={6} key={title}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" sx={{mb:2}} gutterBottom>{title}</Typography>
              <iframe
                width="100%"
                height="315"
                src={video}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>{description}</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleOpen(questions)} 
                sx={{ my: 2 }}
              >
                Start Quiz
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal open={Boolean(openQuiz)} onClose={handleClose}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Quiz quiz={openQuiz} onClose={handleClose} />
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Quiz closed successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrainingPage;