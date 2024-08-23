import React from 'react';
import { Box, Typography, Button} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function EventPage({ event }) {
    return (
        <Box 
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}        
        >   
            <Box
                sx={{
                    width: '100%',
                    height: '40vh',
                    backgroundImage: 'url(https://www.sadiasteaparty.com/wp-content/uploads/2013/03/MG_1111.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)',
                }} 
            />
            <Box sx={{ width: { xs: '90%', sm: '90%', md: '70%' }, height: '60vh', p: 2}}>
                <Typography variant="h4">{event.emoji}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ display: 'block', textAlign: 'left' }}>
                        <Typography variant="h4" fontWeight="bold">{event.title}</Typography>
                        <Typography variant="h6" color={'grey'}>{event.subtitle}</Typography>
                    </Box>
                    <Box sx={{ display: 'block', textAlign: 'right' }}>
                        <Typography variant="body1" color={'grey'} sx={{display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 0.5}}>
                            <CalendarMonthIcon fontSize='small'/>
                            {event.date}
                        </Typography>
                        <Typography variant="body1" color={'grey'} sx={{display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 0.5}}>
                            <AccessTimeIcon fontSize='small'/>
                            {event.time}
                        </Typography>
                        <Typography variant="body1" color={'grey'} sx={{display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 0.5}}>
                            <PlaceIcon fontSize='small'/>
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
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        mt: 4,
                    }}
                >
                    <Typography variant="body1" color={'grey'}>
                        {event.organiser}
                    </Typography>
                    <Button variant="contained">+ Join</Button>
                </Box>
            </Box>
        </Box>
    );
}