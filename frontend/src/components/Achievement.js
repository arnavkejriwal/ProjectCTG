import React from 'react';
import { Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const achievements = {
    1: {
        badge: 'badges/Badge1.png',
        title: 'Baby Steps',
        description: 'Join your first event',
        enabled: true
    },
    2: {
        badge: 'badges/Badge2.png',
        title: 'Early Bird',
        description: 'Register for an event a month in advance',
        enabled: false
    },
    3: {
        badge: 'badges/Badge3.png',
        title: 'Event Marathoner',
        description: 'Join two events in one month',
        enabled: true
    },
    4: {
        badge: 'badges/Badge4.png',
        title: 'Helping Hand',
        description: 'Volunteer at an event',
        enabled: false
    },
    5: {
        badge: 'badges/Badge5.png',
        title: 'Feedback Fanatic',
        description: 'Provide feedback for 5 events',
        enabled: false
    },
    6: {
        badge: 'badges/Badge6.png',
        title: 'Event Enthusiast',
        description: 'Participate at 5 events',
        enabled: false
    },
    7: {
        badge: 'badges/Badge7.png',
        title: 'Volunteer Veteran',
        description: 'Volunteer at 5 events',
        enabled: false
    },
    8: {
        badge: 'badges/Badge8.png',
        title: 'Quiz Master',
        description: 'Complete a quiz.',
        enabled: false
    }
};

const Achievement = ({id}) => {
    const achievement = achievements[id];
    return (
        <Box
            sx={{
                boxShadow: 5,
                padding: 3,
                borderRadius: 2, 
                height: { xs: '175px', sm: '240px', md: '250px' },
                backgroundColor: 'white',
                border: '3px solid lightgrey',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{
                backgroundColor: 'transparent',
                backgroundImage: `url("${achievement.badge}")`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 90,
                height: 90,
                position: 'absolute',
                top: -30,
            }}>
            </Box>
            <Typography variant="h6" sx={{ marginTop: 6, textAlign: 'center' }}>
                { achievement.title }
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'gray', textAlign:'center'}}>
                { achievement.description }
            </Typography>
        </Box>
    );
}

export default Achievement;
export { achievements };