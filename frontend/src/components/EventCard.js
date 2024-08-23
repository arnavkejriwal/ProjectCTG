import React from 'react';
import { Box, Typography, Button} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function EventCard({ emoji, title, subtitle, date, location, onOpen }) {
    return (
        <Box
          sx={{
            width: { xs: '80%', sm: 400, md: 500 },
            height: { xs: 300, sm: 350, md: 400 },
            border: '2px solid lightgrey',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
            },
          }}
          onClick={onOpen}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '60%',
                    position: 'relative',
                }}
            >   
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url(/image.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.6)',
                    }}
                />
                <Typography
                    variant="body1"
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'flex-end',
                        top: 10,
                        right: 15,
                        position: 'absolute',
                    }}
                    color={'white'}
                >
                    <CalendarMonthIcon fontSize="small" />
                    {date}
                </Typography>
            </Box>
            <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                <Box sx={{ display: 'block', textAlign: 'left' }}>
                    <Typography variant="h4">{emoji}</Typography>
                    <Typography variant="h4" fontWeight="bold">{title}</Typography>
                    <Typography variant="h6" color={'grey'}>{subtitle}</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 4,
                    }}
                >
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'start' }} color={'grey'}>
                        <PlaceIcon fontSize="small" />
                        {location}
                    </Typography>
                    <Button variant="contained" >+ Join</Button>
                </Box>
            </Box>
        </Box>
    );
}