import React from 'react';
import { Box, Typography } from '@mui/material';

const Achievement = () => {
    return (
        <Box
            sx={{
                boxShadow: 5,
                padding: 3,
                borderRadius: 2, 
                maxHeight: '250px', 
                backgroundColor: 'white',
                border: '3px solid lightgrey',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                backgroundColor: 'transparent',
                backgroundImage: 'url("badges/Badge1.png")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: 90,
                height: 90,
                position: 'absolute',
                top: -25,
            }}>
            </Box>
            <Typography variant="h6" sx={{ marginTop: 6 }}>
                Baby Steps
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                Join your first event
            </Typography>
        </Box>
    );
}

export default Achievement;