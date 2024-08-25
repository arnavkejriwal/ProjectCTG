import { useEffect, useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import {useTheme} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import {ArrowForwardIos} from '@mui/icons-material';
import EventCard from '../components/EventCard';
import { Grid, IconButton } from '@mui/material';
import TestimonialCard from '../components/TestimonialCard'
import Footer from '../components/Footer'


const Admin = () => {
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
          { !isSmallScreen && 
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
           }
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
              Featured Quizzes
          </Typography>
          
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(4), backgroundColor: '#fff', marginRight: theme.spacing(2), marginLeft: theme.spacing(2) }}>
          <Grid
              container
              spacing={isSmallScreen ? 2 : 4}
              sx={{
                  marginTop: theme.spacing(2),
              }}
              margin={theme.spacing(2)}
          >
              {[1, 2, 3].map((_, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                    margin: theme.spacing(2),
                    marginLeft: theme.spacing(-2),
                  }}
                >
                  <TestimonialCard />
                </Grid>
              ))}
          </Grid>
      </Box>
        
        {/* Community Section */}
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
              Hear From Our Community!
          </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(4), backgroundColor: '#fff', marginRight: theme.spacing(2), marginLeft: theme.spacing(2) }}>
          <Grid
              container
              spacing={isSmallScreen ? 2 : 4}
              sx={{
                  marginTop: theme.spacing(2),
              }}
              margin={theme.spacing(2)}
          >
              {[1, 2, 3].map((_, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                    margin: theme.spacing(2),
                    marginLeft: theme.spacing(-2),
                  }}
                >
                  <TestimonialCard />
                </Grid>
              ))}
          </Grid>
      </Box>
      
      
      <Footer />
    
    </div>
  )
}

export default Admin;
