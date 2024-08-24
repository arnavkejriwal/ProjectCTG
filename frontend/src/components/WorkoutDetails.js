import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import EventCard from './EventCard'
import { Grid, IconButton, Box, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

// WorkoutDetails component
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <Grid container padding={2}>
      {/* Event Card */}
        <Box
          container
          display={'flex'}
          alignItems="center"
          justifyContent="space-between"
          style={{
            padding: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
          }}
        >
          <EventCard event={workout} />
          <Box>
          </Box>
          {/* Delete Button */}
          <IconButton aria-label="delete" onClick={handleClick}>
            <DeleteIcon color="#333" />
          </IconButton>
        </Box>
    </Grid>
  )
}

export default WorkoutDetails
