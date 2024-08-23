import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function EventCard({ emoji, title, subtitle, date, location, onOpen }) {
    // Function to return the appropriate emoji
    const renderEmoji = () => {
        if (emoji === "Tea") return "🍵";
        if (emoji === "Injection") return "💉";
        return "🧠"; // Default brain emoji or any other based on context
    };

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
            onClick={onOpen}
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '22px',
                        padding: '5px',
                    }}
                >
                    <CalendarMonthIcon fontSize="small" sx={{ color: 'white', marginRight: 0.5 }} />
                    {date}
                </Typography>
            </Box>
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h4" sx={{ mr: 2 }}>
                        {renderEmoji()}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#333' }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    {subtitle}
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
                        {location}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#f9ef1f', // Bright yellow like the website
                            color: '#000',
                            borderRadius: '20px',
                            padding: '6px 16px',
                            '&:hover': {
                                backgroundColor: '#f9ef1f', // Slightly lighter on hover
                            },
                        }}
                    >
                        + Join
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
