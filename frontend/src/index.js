import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import '@fontsource/poppins';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);