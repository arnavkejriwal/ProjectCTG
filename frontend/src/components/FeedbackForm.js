import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  FormLabel,
  Box,
  Modal,
  Slider,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const questions = [
    "How would you rate the overall experience?",
    "How satisfied are you our staff?",
    "How likely are you to recommend us to a friend?",
    "How would you rate your fellow attendees?",
    "How likely are you to return to another event?",
];

const FeedbackForm = () => {
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [ratings, setRatings] = useState(
      questions.reduce((acc, _, index) => {
        acc[`question${index + 1}`] = 1;
        return acc;
      }, {})
    );
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const handleRatingChange = (question, value) => {
      setRatings({ ...ratings, [question]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log({ feedback, ratings });
      setSnackbarOpen(true);
      setOpen(false);
      resetForm();
    };
  
    const handleClose = () => setOpen(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);
  
    const resetForm = () => {
      setFeedback('');
      setRatings(
        questions.reduce((acc, _, index) => {
          acc[`question${index + 1}`] = 1;
          return acc;
        }, {})
      );
    };
  
    return (
      <Container>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Give Feedback
        </Button>
        
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
              margin: 'auto',
              mt: '100px',
              fontFamily: 'Arial, sans-serif',
              position: 'relative',
            }}
          >
            <IconButton
              sx={{ position: 'absolute', top: 16, right: 16 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
  
            <Typography variant="h4" gutterBottom>
              Feedback Form
            </Typography>
  
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Rate the following:
              </Typography>
              {questions.map((question, index) => (
                <Box mb={2} key={index}>
                  <FormLabel component="legend">{question}</FormLabel>
                  <Slider
                    value={ratings[`question${index + 1}`]}
                    onChange={(e, value) => handleRatingChange(`question${index + 1}`, value)}
                    step={1}
                    marks
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </Box>
              ))}
  
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Any additional comments or suggestions?"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Box>
              
              <Button variant="contained" color="primary" type="submit">
                Submit Feedback
              </Button>
            </form>
          </Box>
        </Modal>
  
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            Feedback submitted successfully!
          </Alert>
        </Snackbar>
      </Container>
    );
  };
  
  export default FeedbackForm;