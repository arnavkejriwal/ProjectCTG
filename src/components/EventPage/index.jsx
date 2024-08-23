import React from 'react';
import { Box, Typography, Button} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function EventPage({emoji, title, subtitle, date, time, location}) {
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
                    backgroundImage: 'url(/image.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)',
                }} 
            />
            <Box sx={{ width: { xs: '90%', sm: '90%', md: '70%' }, height: '60vh', p: 2}}>
                <Typography variant="h4">{emoji}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box sx={{ display: 'block', textAlign: 'left' }}>
                        <Typography variant="h4" fontWeight="bold">{title}</Typography>
                        <Typography variant="h6" color={'grey'}>{subtitle}</Typography>
                    </Box>
                    <Box sx={{ display: 'block', textAlign: 'right' }}>
                        <Typography variant="body1" color={'grey'} sx={{display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 0.5}}>
                            <CalendarMonthIcon fontSize='small'/>
                            {date}
                        </Typography>
                        <Typography variant="body1" color={'grey'} sx={{display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 0.5}}>
                            <AccessTimeIcon fontSize='small'/>
                            {time}
                        </Typography>
                        <Typography variant="body1" color={'grey'} sx={{display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 0.5}}>
                            <PlaceIcon fontSize='small'/>
                            {location}
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
                        Lorem ipsum dotor sit amet...
                        <br/>
                        This place has more information about the event.
                        <br/>
                        This place has even more information about the event.
                        <br/>
                        Keine mehr Infos.
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
                        Organised by:
                        <br/>
                        The Zubin Foundation
                    </Typography>
                    <Button variant="contained">+ Join</Button>
                </Box>
            </Box>
        </Box>
    );
}