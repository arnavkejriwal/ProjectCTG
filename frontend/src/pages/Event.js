import EventCard from "../components/EventCard";
// import { Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid } from "@mui/material";
import { useMediaQuery } from '@mui/material';

const Event = () => {
    const theme = useTheme();  // Accessing the theme object
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));  // Check if the screen size is small

    // const eventData = [
    //     {
    //       event_id: 1,
    //       emoji: "🏃‍♀️",
    //       title: "Run",
    //       subtitle: "10K",
    //       date: "2022-01-01",
    //       location: "Running track",}];
    const [eventData, setEventData] = useState([]);
    
    const getEvents = async () => {
      try {
        const response = await fetch('/api/events/get_events', {
          })
          const json = await response.json()
          console.log(json);
          setEventData(json);
      } catch (error) {
        console.error("Error getting lesson data:", error);
      }
    };

    useEffect(() => {
        if(!eventData[0]){
            getEvents();
        }
    });


    return (
        <Grid 
        container 
        spacing={isSmallScreen ? 1 : 3} 
        sx={{
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[2],
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[5],
            transform: 'translateY(-4px)',
          }
        }}
      >
        {eventData.map((event, index) => (
          <Grid 
            key={index} 
            item 
            xs={12} 
            md={6} 
            lg={4} 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            <EventCard 
              emoji={event.emoji} 
              title={event.title} 
              subtitle={event.subtitle} 
              date={event.date} 
              location={event.location} 
              onOpen={() => {}} 
              sx={{
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[3],
                transition: 'box-shadow 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: theme.shadows[6],
                }
              }}
            />  
          </Grid>
        ))}
      </Grid>
    )
  }
  
  export default Event