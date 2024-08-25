import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useAuthContext } from '../hooks/useAuthContext';

export default function EventPage({ event, onClose }) { 

    const { user } = useAuthContext();

    // Function to handle joining the event
    const handleJoin = async (role) => {
        console.log('Joining event:', event._id, 'as a', role, " - User:", user.email); // Updated log to use email
        try {
            const response = await fetch('/api/joined/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,  // The current user's email
                    eventId: event._id,  // The event's ID
                    role: role  // Either "Volunteer" or "Participant" based on the button clicked
                }),
            });

            if (response.status === 201) {
                alert('Successfully joined the event as a ' + role);
            } else {
                alert('Failed to join the event.');
            }
        } catch (error) {
            console.error('Error joining event:', error);
            alert('An error occurred while trying to join the event.');
        }
    };

    return (
        <Box 
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative', 
            }}        
        >   
            <Box 
                onClick={onClose} 
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem', 
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    width: '35px',
                    height: '35px',
                    border: '1px solid lightgrey',
                    borderRadius: '50%',
                    zIndex: 5,
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                }} 
            >
                <ArrowBack />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '40vh',
                    position: 'relative', 
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url(https://www.sadiasteaparty.com/wp-content/uploads/2013/03/MG_1111.jpg)',
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
                        left: { xs: '5%', sm: '5%', md: '20%' },
                        backgroundColor: 'white', 
                        borderRadius: '50%',
                        border: '1px solid lightgrey',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '8px',
                        zIndex: 2,
                    }}
                >
                    <Typography variant="h3">{event.emoji}</Typography>
                </Box>
            </Box>
            <Box sx={{ width: { xs: '90%', sm: '90%', md: '60%' }, height: '60vh', p: 2 }}>
                <Box sx={{ display: 'block', textAlign: 'left', mt: 2 }}>
                    <Typography variant="h4" fontWeight="bold">{event.title}</Typography>
                    <Typography variant="h6" color={'grey'}>{event.subtitle}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3, gap: 1 }}>
                        <Typography variant="body1" color={'grey'} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                            <CalendarMonthIcon fontSize='small' />
                            {event.date}
                        </Typography>
                        <Typography variant="body1" color={'grey'} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                            <AccessTimeIcon fontSize='small' />
                            {event.time}
                        </Typography>
                        <Typography variant="body1" color={'grey'} sx={{ display: 'flex', alignItems: 'start', gap: 0.5 }}>
                            <PlaceIcon fontSize='small' />
                            {event.location}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 4,
                    }}
                >
                    <Typography>
                        {event.description}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'center' },
                        justifyContent: { xs: 'start', sm: 'start', md: 'space-between' },
                        mt: 4,
                        mb: 8,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box
                            sx={{
                                backgroundImage: `url(${event.organiser_img})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundColor: 'white',
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                border: '1px solid lightgrey',
                            }}
                        >
                        </Box>
                        <Typography variant="body1" color={'grey'} fontSize={'0.8rem'}>
                            Organiser: <br />
                            {event.organiser}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            mt: { xs: 5, sm: 4, md: 0 },
                        }}
                    >
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => handleJoin('Volunteer')} // Handle Join as Volunteer
                        >
                            Join as a Volunteer
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={() => handleJoin('Participant')} // Handle Join as Participant
                        >
                            Join as a Participant
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <br />
                </Box>
            </Box>
        </Box>
    );
}
