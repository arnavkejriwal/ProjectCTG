import EventCard from "../components/EventCard";
import EventDetails from "../components/EventDetails";
import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import { Grid, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Box } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import {Container, Card} from "@mui/material";

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // Note: Month is 0-indexed in JS Date
};

const Event = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [eventData, setEventData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("All");
    const [selectedDestination, setSelectedDestination] = useState("All");

    const monthOptions = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const destinationOptions = ["All", "Tung Chung", "Kowloon", "Stadium", "Park"];

    const getEvents = async () => {
        try {
            const response = await fetch('/api/events/get_events');
            const json = await response.json();
            console.log(json);
            setEventData(json);
        } catch (error) {
            console.error("Error getting event data:", error);
        }
    };

    useEffect(() => {
        if (!eventData.length) {
            getEvents();
        }
    }, [eventData]);

    const filteredEvents = eventData
        .filter(event => {
            const eventDate = parseDate(event.date);
            const today = new Date();
            return eventDate >= today;  // Filter out expired events
        })
        .filter(event => {
            const matchesSearchQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase());
            const eventDate = parseDate(event.date);
            const eventMonth = eventDate.toLocaleString('default', { month: 'long' });
            const matchesMonth = selectedMonth === "All" || eventMonth === selectedMonth;
            const matchesDestination = selectedDestination === "All" || event.location === selectedDestination;
            return matchesSearchQuery && matchesMonth && matchesDestination;
        })
        .sort((a, b) => parseDate(a.date) - parseDate(b.date));  // Sort events by date

    const groupedEvents = filteredEvents.reduce((groups, event) => {
        const eventDate = parseDate(event.date);
        const month = eventDate.getMonth();
        const monthName = eventDate.toLocaleString('default', { month: 'long' });
        if (!groups[month]) {
            groups[month] = { monthName, events: [] };
        }
        groups[month].events.push(event);
        return groups;
    }, {});

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventDetailsOpen, setEventDetailsOpen] = useState(false);

    return (
        <Box sx={{ backgroundColor: 'white', padding: theme.spacing(0)}}>
            { eventDetailsOpen? (
                <EventDetails event={selectedEvent} />
            ) : (
                <>
                    {/* Title Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing(6) }}>
                        <Box
                            component="img"
                            src="https://d2yy7txqjmdbsq.cloudfront.net/nonprofits/05da5a45-cbcb-4e08-8bb8-2f2f5784583c/3031/gal__DSC1265.JPG"
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
                            Events
                        </Typography>
                    </Box>
                    
                    {/* Search and Filter Section */}
                    <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ marginBottom: theme.spacing(6) }}>
                        <Grid item xs={12} md={6} lg={4}>
                            <TextField
                                label="Search by title"
                                variant="standard"
                                fullWidth
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: "5px",
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                }} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: theme.shape.borderRadius, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    label="Month"
                                >
                                    {monthOptions.map((month, index) => (
                                        <MenuItem key={index} value={month}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: theme.shape.borderRadius, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                                <InputLabel>Location</InputLabel>
                                <Select
                                    value={selectedDestination}
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    label="Destination"
                                >
                                    {destinationOptions.map((destination, index) => (
                                        <MenuItem key={index} value={destination}>{destination}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Event Groups by Month */}
                    {Object.values(groupedEvents).map((group, idx) => (
                        <Box key={idx} sx={{ marginBottom: theme.spacing(6), backgroundColor: "#fff" }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{
                                    fontWeight: 600,
                                    color: '#333',
                                    borderBottom: `2px solid #333`,
                                    paddingBottom: theme.spacing(1),
                                }}
                            >
                                {group.monthName}
                            </Typography>
                            <Grid
                                container
                                spacing={isSmallScreen ? 2 : 4}
                                sx={{
                                    marginTop: theme.spacing(2),
                                }}
                            >
                                {group.events.map((event, index) => (
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
                                                transform: 'scale(1.03)',
                                                transition: 'transform 0.2s ease-in-out',
                                            }
                                        }}
                                    >
                                        <EventCard
                                            event={event}
                                            onClick={() => { setSelectedEvent(event); setEventDetailsOpen(true); }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    );
}

export default Event;
