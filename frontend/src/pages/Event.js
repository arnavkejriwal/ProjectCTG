import EventCard from "../components/EventCard";
import EventDetails from "../components/EventDetails";
import EventBanner from "../components/EventBanner"; // Import the EventBanner component
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import Slider from "react-slick"; // Import react-slick for the carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Footer from "../components/Footer";
import { ImageAccordion } from "../components/ImageAccordion";

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
};

const Event = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [eventData, setEventData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("All");
    const [selectedDestination, setSelectedDestination] = useState("All");
    // const [bannerData, setBannerData] = useState([]);

    const monthOptions = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const destinationOptions = ["All", "Tung Chung", "Kowloon", "Stadium", "Park"];

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

    const getEvents = async () => {
        try {
            const response = await fetch('/api/events/get_events');
            const json = await response.json();
            setEventData(json);
            // setBannerData(json); // Set banner data as the complete list of events
        } catch (error) {
            console.error("Error getting event data:", error);
        }
    };

    useEffect(() => {
        if (!eventData.length) {
            getEvents();
        }
    }, [eventData]);

    // Filtering the events for the event cards grid
    const filteredEvents = eventData
        .filter(event => {
            const eventDate = parseDate(event.date);
            const today = new Date();
            return eventDate >= today;
        })
        .filter(event => {
            const matchesSearchQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase());
            const eventDate = parseDate(event.date);
            const eventMonth = eventDate.toLocaleString('default', { month: 'long' });
            const matchesMonth = selectedMonth === "All" || eventMonth === selectedMonth;
            const matchesDestination = selectedDestination === "All" || event.location === selectedDestination;
            return matchesSearchQuery && matchesMonth && matchesDestination;
        })
        .sort((a, b) => parseDate(a.date) - parseDate(b.date));


    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventDetailsOpen, setEventDetailsOpen] = useState(false);

    // Settings for the carousel using react-slick
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 1000,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true, // Enable autoplay
    //     autoplaySpeed: 5000, // Change slide every 5 seconds
    //     arrows: true,
    //     nextArrow: isSmallScreen ? null : <NextArrow />,
    //     prevArrow: isSmallScreen ? null : <PrevArrow />,
    //     dotsClass: "slick-dots custom-dots", 
    //     appendDots: (dots) => (
    //         <div
    //             style={{
    //                 position: 'relative',
    //                 bottom: '30px',
    //                 color: 'white'
    //             }}
    //         >
    //             <ul style={{ margin: "0px", padding: "0", color: "white" }}> {dots} </ul>
    //         </div>
    //     ),
    // };
    
    

    return (
        <Box sx={{ backgroundColor: 'white', padding: theme.spacing(0) }}>
            {eventDetailsOpen ? (
                <EventDetails event={selectedEvent} onClose={() => { setEventDetailsOpen(false); setSelectedEvent(null); }} />
            ) : (
                <>
                    {/* Hero Section*/}
                    <Box className="page" sx={{ backgroundColor: 'white', paddingBottom: theme.spacing(4) }}>
                        <ImageAccordion items={coolImages} />
                    </Box>

                    {/* Search and Filter Section */}
                    <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ marginBottom: theme.spacing(6) }}>
                    <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Search by title"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '25px', // Rounded edges like the image
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for floating effect
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '25px', // Ensures the input field corners match
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none', // Remove default border for a minimal look
                                    },
                                }}
                            />
                        </Grid>
                        {/* Month Filter */}
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined" sx={{
                                backgroundColor: '#fff',
                                borderRadius: '25px', // Rounded edges for modern look
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for floating effect
                            }}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    label="Month"
                                    sx={{
                                        borderRadius: '25px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none', // Remove border for clean look
                                        },
                                    }}
                                >
                                    {monthOptions.map((month, index) => (
                                        <MenuItem key={index} value={month}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Location Filter */}
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined" sx={{
                                backgroundColor: '#fff',
                                borderRadius: '25px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for floating effect
                            }}>
                                <InputLabel>Location</InputLabel>
                                <Select
                                    value={selectedDestination}
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    label="Destination"
                                    sx={{
                                        borderRadius: '25px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none', // Remove border for clean look
                                        },
                                    }}
                                >
                                    {destinationOptions.map((destination, index) => (
                                        <MenuItem key={index} value={destination}>
                                            {destination}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {/* Event Cards Grid */}
                    <Grid
                        container
                        spacing={isSmallScreen ? 2 : 4}
                        sx={{
                            marginTop: theme.spacing(2),
                            paddingBottom: theme.spacing(8),
                        }}
                    >
                        {filteredEvents.map((event, index) => (
                            <Grid
                                key={index}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        transition: 'transform 0.2s ease-in-out',
                                    },
                                }}
                            >
                                <EventCard
                                    event={event}
                                    onClick={() => { setSelectedEvent(event); setEventDetailsOpen(true); }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Footer />
                </>
            )}
        </Box>
    );
}

// const NextArrow = ({ onClick }) => {
//     return (
//         <div
//             style={{
//                 display: "block",
//                 position: "absolute",
//                 top: "50%",
//                 right: "-25px",
//                 transform: "translateY(-50%)",
//                 zIndex: 1,
//                 cursor: "pointer",
//                 color: "white",
//             }}
//             onClick={onClick}
//         >
//             <ArrowForwardIos sx={{ fontSize: "30px", color: "#333" }} />
//         </div>
//     );
// };

// const PrevArrow = ({ onClick }) => {
//     return (
//         <div
//             style={{
//                 display: "block",
//                 position: "absolute",
//                 top: "50%",
//                 left: "-25px",
//                 transform: "translateY(-50%)",
//                 zIndex: 1,
//                 cursor: "pointer",
//                 color: "white",
//                 ml: "10px",
//             }}
//             onClick={onClick}
//         >
//             <ArrowBackIos sx={{ ml: "8px", fontSize: "30px", color: "#333" }} />
//         </div>
//     );
// };

export default Event;
