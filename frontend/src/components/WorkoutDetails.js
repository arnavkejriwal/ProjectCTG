import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import EventCard from './EventCard'
import { Grid, IconButton, Box, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// WorkoutDetails component
const WorkoutDetails = ({ workout, setSelectedWorkout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleEditClick = () => {
    setSelectedWorkout(workout);
  };

  return (
    <Grid container padding={2}>
      <Box
        container
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={"column"}
        style={{
          padding: "16px",
          borderRadius: "8px",
        }}
        onClick={handleEditClick}
      >
        <EventCard event={workout} />
        <Box width="100%" display={"flex"} alignItems="center" justifyContent="space-between">
          <IconButton aria-label="delete" onClick={handleClick} sx={{ml: 1}}>
            <DeleteIcon color="#333" />
          </IconButton>
          <Typography variant="body1" sx={{ color: "#333", mr: 1, userSelect: "none", cursor: "pointer" }}>
            Click to Edit
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default WorkoutDetails;
