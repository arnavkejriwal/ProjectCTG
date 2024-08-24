import { useEffect, useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { Box } from '@mui/material';

const Admin = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  
  // State for the selected workout
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
    <Box className="admin">
      {/* Pass selectedWorkout and setSelectedWorkout to WorkoutForm */}
      <WorkoutForm 
        selectedWorkout={selectedWorkout} 
        setSelectedWorkout={setSelectedWorkout} 
      />
      <Box className="workouts">
        {workouts && workouts.map((workout) => (
          // Pass setSelectedWorkout to WorkoutDetails
          <WorkoutDetails 
            key={workout._id} 
            workout={workout} 
            setSelectedWorkout={setSelectedWorkout} 
          />
        ))}
      </Box>
    </Box>
  );
}

export default Admin;
