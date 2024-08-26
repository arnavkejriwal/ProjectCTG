import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';

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
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '200px',
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
                        color: 'lightgrey',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '22px',
                        padding: '5px',
                        zIndex: 2,
                    }}
                >
                    <CalendarMonthIcon fontSize="small" sx={{ color: 'white', marginRight: 0.5 }} />
                    {event.date}
                </Typography>
                <Box sx={{width:55, 
                    display:'flex',
                    position: 'absolute',
                    bottom: 10,
                    right: 7.5, 
                    zIndex: 2,
                    flexDirection:'row', 
                    justifyContent:'center', 
                    backgroundColor: '#FFF', 
                    borderRadius:'20px'}}>
                <Typography variant="body1" sx={{color: '#000', fontSize: 14}}>
                    150 
                </Typography>
                <StarIcon sx={{fontSize: 18, color:'#FDDA0D'}}/>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${event.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-16px',
                        left: '5%',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        border: '1px solid lightgrey',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                    }}
                >
                    <Typography variant="h4">{event.emoji}</Typography>
                </Box>
            </Box>
            <Box sx={{ p: 2, mt: 1.5 }}>
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
