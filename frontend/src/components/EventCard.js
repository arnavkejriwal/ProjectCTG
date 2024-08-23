import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function EventCard({ event, onClick }) {
    return (
        <Box
            sx={{
                width: { xs: '100%', sm: 400, md: 450 },
                border: '1px solid #E0E0E0',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // Slight hover effect
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '200px',
                    backgroundImage: 'url(https://www.sadiasteaparty.com/wp-content/uploads/2013/03/MG_1111.jpg)', // Event image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)',
                    position: 'relative',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        position: 'absolute',
                        top: 7.5,
                        right: 7.5,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '22px',
                        padding: '5px',
                    }}
                >
                    <CalendarMonthIcon fontSize="small" sx={{ color: 'white', marginRight: 0.5 }} />
                    {event.date}
                </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4">
                    {event.emoji}
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: "#333" }}>
                    {event.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    {event.subtitle}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#555' }}>
                        <PlaceIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {event.location}
                    </Typography>
                    <Button
                        variant="contained"
                    >
                        Join
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
