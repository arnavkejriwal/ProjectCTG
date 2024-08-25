import { useEffect, useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box, Paper, Divider, Typography } from '@mui/material';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Admin = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user, selectedWorkout]);

  return (
    <Box
      className="admin"
      position="fixed"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Column on small screens, row on larger screens
        height: '85vh',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        padding: 2,
        gap: 2,
        mr: 2,
      }}
    >
      <Paper
        sx={{
          flex: { xs: 'none', md: 3 }, // Take full width on small screens, 60% on larger screens
          overflowY: 'auto',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {selectedWorkout ? "Update Event" : "Add Event"}
        </Typography>
        <Divider />
        <WorkoutForm
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
        />
      </Paper>

      <Paper
        sx={{
          flex: { xs: 'none', md: 2 }, // Take full width on small screens, 40% on larger screens
          overflowY: 'auto',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Events List
        </Typography>
        <Divider />
        <Box sx={{ flex: 1 }}>
          {workouts && workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              setSelectedWorkout={setSelectedWorkout}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Admin;
