import EventCard from "../components/EventCard";
// import { Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";

const Event = () => {

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
    <Grid container spacing={2}>
      {
        eventData.map((event) => (
        <Grid item xs={12} md={12} lg={4}>
            <EventCard emoji={event.emoji} title={event.title} subtitle={event.subtitle} date={event.date} location={event.location} onOpen={() => {}}/>  
        </Grid>
        ))
      }
    </Grid>
    )
  }
  
  export default Event