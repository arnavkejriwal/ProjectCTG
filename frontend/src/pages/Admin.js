import { useEffect, useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import {useTheme} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';
import Slider from 'react-slick';
import EventCard from '../components/EventCard';
import { Grid, IconButton } from '@mui/material';

const NextArrow = ({ onClick }) => {
  return (
    <div
      style={{
        display: "block",
        position: "absolute",
        top: "50%",
        right: "-25px",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        color: "white",
      }}
      onClick={onClick}
    >
      <ArrowForwardIos />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      style={{
        display: "block",
        position: "absolute",
        top: "50%",
        left: "-25px",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        color: "white",
      }}
      onClick={onClick}
    >
      <ArrowBackIos />
    </div>
  );
};

const Admin = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [eventData, setEventData] = useState([]);

  const getEvents = async () => {
    try {
        const response = await fetch('/api/events/get_events');
        const json = await response.json();
        const closestEvents = filterClosestEvents(json);
        setEventData(closestEvents);
    } catch (error) {
        console.error("Error getting event data:", error);
    }
  };

  const filterClosestEvents = (events) => {
      const sortedEvents = events
          .map(event => ({
              ...event,
              parsedDate: parseDate(event.date)
          }))
          .sort((a, b) => a.parsedDate - b.parsedDate);
      return sortedEvents.slice(0, 3);
  };

  const parseDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
  };

  useEffect(() => {
      if (!eventData.length) {
          getEvents();
      }
  });

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(6) }}>
          <Box
              component="img"
              src="https://www.thestandard.com.hk/newsImage/20240621/50092838contentPhoto1.jpg"
              sx={{
                  width: '100%',
                  height: { xs: '250px', sm: '450px' },
                  marginBottom: theme.spacing(6),
                  borderRadius: theme.shape.borderRadius,
                  objectFit: { xs: 'contain', sm: 'cover' },
                  zIndex: 0,
                  overflow: "auto",
                  borderRadius: theme.shape.borderRadius,
              }} />
          <Typography
              sx={{
                  padding: theme.spacing(1),
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
                  marginTop: -10,
                  width: { xs: '50%', sm: '20%' },
                  alignContent: 'center',
                  marginBottom: theme.spacing(0.5),
                  zIndex: 1,
                  backgroundColor: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#01a9ff',
              }}
              variant={isSmallScreen ? "h5" : "h4"}
          >
              Home
          </Typography>
      </Box>

      <Box sx={{ marginBottom: theme.spacing(1), backgroundColor: "#fff" }}>
          <Typography
              variant="h4"
              align="center"
              sx={{
                  fontWeight: 600,
                  color: '#333',
                  borderBottom: `2px solid #333`,
                  paddingBottom: theme.spacing(1),
              }}
          >
              Upcoming Events
          </Typography>
          
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(6) }}>
      <Grid
        container
        spacing={isSmallScreen ? 2 : 4}
        sx={{
            marginTop: theme.spacing(2),
        }}
    >
          {eventData.map((item, index) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  transform: 'scale(1.03)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
            >
             <EventCard event={item} />  
            </Grid>
          ))}
          </Grid>
          {/* The new yellowish arrow */}
          <IconButton
              sx={{
                  backgroundColor: 'yellow',
                  color: 'black',
                  '&:hover': {
                      backgroundColor: '#01a9ff',
                      color: 'white',
                      borderColor: 'white',
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                  },
                  borderRadius: '50%',
                  padding: '16px',
                  marginRight: '16px',
                  marginLeft: '16px',
              }}
              href='/events'
          >
              <ArrowForwardIos fontSize="large" />
          </IconButton>
        </Box>
    
    </div>
  )
}

export default Admin;
