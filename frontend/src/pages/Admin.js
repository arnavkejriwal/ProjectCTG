import { useEffect, useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import EventCard from '../components/EventCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';
import { ImageAccordion } from '../components/ImageAccordion';
import Slider from "react-slick"; // Carousel library
import {useMediaQuery} from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos} from "@mui/icons-material";

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
        parsedDate: parseDate(event.date),
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

  const coolImages = [
    {
      header: "Zubin Annual Fundraising Dinner",
      image: "https://www.zubinfoundation.org/wp-content/uploads/2023/05/3.jpg",
      text: `Image description`,
    },
    {
      header: "Mental Health Awareness",
      image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: `Image description`,
    },
    {
      header: "Health Camp",
      image: "https://images.unsplash.com/photo-1643321612557-57cef422f401?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: `Image description`,
    },
  ];


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Change slide every 5 seconds
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      <section className="page">
        <ImageAccordion items={coolImages} />
      </section>

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
            <Box key={index} sx={{ padding: theme.spacing(2) }}>
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
            <Box key={index} sx={{ padding: theme.spacing(2), textAlign: 'center' }}>
              <TestimonialCard />
            </Box>
          ))}
          </Slider>
        </Box>
      </Box>

      <Footer />
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
