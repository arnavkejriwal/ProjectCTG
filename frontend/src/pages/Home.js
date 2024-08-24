import { useEffect }from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { Box } from '@mui/material'
import Split from 'react-split'

const Admin = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])



  return (
    <Box fullWidth>
        <Box className="admin">
          <WorkoutForm />
          <Box className="workouts">
            {workouts && workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
          </Box>
        </Box>
    </Box>
  )
}

export default Admin;