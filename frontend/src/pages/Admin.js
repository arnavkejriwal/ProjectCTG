import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import EventCard from '../components/EventCard';
import TestimonialCard from '../components/TestimonialCard';
import Slider from "react-slick"; // Carousel library
import {useMediaQuery} from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos} from "@mui/icons-material";
import Footer from "../components/Footer";
import EventDetails from "../components/EventDetails";
import EventBanner from '../components/EventBanner';

const Admin = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [eventData, setEventData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  
  const getEvents = async () => {
    try {
      const response = await fetch('/api/events/get_events');
      const json = await response.json();
      const closestEvents = filterClosestEvents(json);
      setEventData(closestEvents);
      setBannerData(closestEvents);
    } catch (error) {
      console.error("Error getting event data:", error);
    }
  };

  useEffect(() => {
    if (!eventData.length) {
        getEvents();
    }
});

// Filtering the events for the event cards grid
// const filteredEvents = bannerData
//     .filter(event => {
//         const eventDate = parseDate(event.date);
//         const today = new Date();
//         return eventDate >= today;
//     })
//     .sort((a, b) => parseDate(a.date) - parseDate(b.date));



  const filterClosestEvents = (events) => {
    const sortedEvents = events
      .map(event => ({
        ...event,
        parsedDate: parseDate(event.date),
      }))
      .sort((a, b) => a.parsedDate - b.parsedDate);
    return sortedEvents.slice(0, 5);
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

  const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true, // Enable autoplay
      autoplaySpeed: 5000, // Change slide every 5 seconds
      arrows: true,
      nextArrow: isSmallScreen ? null : <NextArrow />,
      prevArrow: isSmallScreen ? null : <PrevArrow />,
      dotsClass: "slick-dots custom-dots", 
      appendDots: (dots) => (
          <div
              style={{
                  position: 'relative',
                  bottom: '30px',
                  color: 'white'
              }}
          >
              <ul style={{ margin: "0px", padding: "0", color: "white" }}> {dots} </ul>
          </div>
      ),
  };


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Change slide every 5 seconds
    arrows: true,
    nextArrow: isSmallScreen ? null : <NextArrow />,
    prevArrow: isSmallScreen ? null : <PrevArrow />,
    dotsClass: "slick-dots custom-dots", 
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ],
  };

  return (
    <div>
      {eventDetailsOpen ? (
                <EventDetails event={selectedEvent} onClose={() => { setEventDetailsOpen(false); setSelectedEvent(null); }} />
            ) : (
      <>
      <Box sx={{ marginBottom: theme.spacing(6), borderRadius: "20px" }}>
          <Slider {...settings}>
              {bannerData.slice(0, 5).map((event, index) => ( // Use bannerData directly for slider
                  <Box key={index}> 
                      <EventBanner
                          event={event}
                          onClick={() => { setSelectedEvent(event); setEventDetailsOpen(true); }}
                      />
                  </Box>
              ))}
          </Slider>
      </Box>
      {/* Upcoming Events Section */}
      <Box
        sx={{
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(1),
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: '#333',
            paddingBottom: theme.spacing(1),
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Upcoming Events
        </Typography>
      </Box>

      {/* Carousel for Upcoming Events */}
      <Box sx={{ marginBottom: theme.spacing(6), borderRadius: "20px" }}>
        <Slider {...carouselSettings}>
          {eventData.map((event, index) => (
            <Box key={index} onClick={() => { setSelectedEvent(event); setEventDetailsOpen(true); }}>
              <EventCard event={event} />
            </Box>
          ))}
        </Slider>
      </Box>
      {/* Carousel for Testimonials */}
      <Box
        sx={{
          marginTop: theme.spacing(4),
          backgroundColor: '#fff',
          padding: theme.spacing(4),
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: '#333',
            paddingBottom: theme.spacing(1),
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Hear From Our Community
        </Typography>

        <Box sx={{ marginBottom: theme.spacing(6), borderRadius: "20px" }}>
          <Slider {...carouselSettings}>
          {[1, 2, 3].map((_, index) => (
            <Box key={index} sx={{ textAlign: 'center' }}>
              <TestimonialCard />
            </Box>
          ))}
          </Slider>
        </Box>
      </Box>
      <Footer />
      </>
    )}
    </div>
  );
};

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
          <ArrowForwardIos sx={{ fontSize: "30px", color: "#333" }} />
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
              ml: "10px",
          }}
          onClick={onClick}
      >
          <ArrowBackIos sx={{ ml: "8px", fontSize: "30px", color: "#333" }} />
      </div>
  );
};

export default Admin;
