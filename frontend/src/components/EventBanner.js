import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useMediaQuery} from '@mui/material';


export default function EventBanner({ event, onClick }) {
    const isMobile = useMediaQuery('(max-width: 500px)');
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '250px', md: '400px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${event.banner_img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s',
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            />
            <Grid
                container
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    padding: { xs: '16px', md: '32px' },
                }}
                spacing={4}
            >
                <Grid item xs={12} md={6}>
                    <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold" sx={{ mb: 1 }}>
                        {event.title}
                    </Typography>
                    <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: isMobile ? "bold" : "normal", mb: 2 }}>
                        {event.subtitle}
                    </Typography>
                    <Typography
                        variant={isMobile ? "body2" : "body1"}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            fontWeight: 'bold',
                        }}
                    >
                        <CalendarMonthIcon sx={{ mr: 1 }} />
                        {event.date}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            fontWeight: 'bold',
                        }}
                    >
                        <AccessTimeIcon sx={{ mr: 1 }} />
                        {event.time}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                        }}
                    >
                        <PlaceIcon sx={{ mr: 1 }} />
                        {event.location}
                    </Typography>
                </Grid>
                {/* <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#01a9ff',
                            '&:hover': {
                                backgroundColor: '#018ed4',
                            },
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            marginRight: '30px'
                        }}
                        onClick={onClick}
                    >
                        Join Event
                    </Button>
                </Grid> */}
            </Grid>
        </Box>
    );
}
