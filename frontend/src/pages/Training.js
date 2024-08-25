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
  "Mental Health Camp Training": {
    description: "Test your knowledge from the video content",
    video: "https://www.youtube.com/embed/watch?v=LaIXttN82sk&list=PLaTWjeYeMaR2vz9OZj1xQZXyExa0jvGCy",
    questions: [
      { question: "What is a common symptom of depression?", options: ["Increased energy", "Persistent sadness", "Euphoria"], answer: "Persistent sadness" },
      { question: "What does CBT stand for?", options: ["Cognitive Behavioral Therapy", "Crisis Behavioral Therapy", "Cognitive Biochemical Therapy"], answer: "Cognitive Behavioral Therapy" },
    ],
  },
  "Learn Cantonese!": {
    description: "Learn the basics used in everyday Cantonese conversations.",
    video: "https://www.youtube.com/embed/watch?v=p-jUPNQ8uBI&list=PLaTWjeYeMaR0dKCyyUeGNVsbXu806jHj1",
    questions: [
      { question: "What is the Cantonese word for 'hello'?", options: ["你好", "再見", "多謝"], answer: "你好" },
      { question: "What is the Cantonese word for 'thank you'?", options: ["多謝", "對唔住", "歡迎"], answer: "多謝" },
    ],
  },
  "Cultural Sensitivity Training": {
    description: "Test your understanding of cultural sensitivity and awareness.",
    video: "https://www.youtube.com/embed/playlist?list=PLaTWjeYeMaR3ayT-mACkx0IBpOZXPMNmv",
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
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#01a9ff', my: 4 }}>
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