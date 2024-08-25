import React from 'react';
import { Box, Typography } from '@mui/material';

const TestimonialCard = () => {
    return (
        <div className="testimonial-card">
            <Box
                sx={{
                    width: { xs: '100%', sm: 300, md: 350 },
                    border: '1px solid #E0E0E0',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' }, // Responsive direction
                    backgroundColor: 'white',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                    },
                }}
            >
                {/* Image Container on the left */}
                <Box
                    sx={{
                        width: { xs: '100%', sm: '150px' }, // Width for the image container
                        flexShrink: 0, // Prevent the image container from shrinking
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src="https://t4.ftcdn.net/jpg/05/31/37/89/360_F_531378938_xwRjN9e5ramdPj2coDwHrwk9QHckVa5Y.jpg"
                        alt="A person smiling in a park"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Cover to maintain aspect ratio
                    />
                </Box>

                {/* Text Content on the right */}
                <Box
                    sx={{
                        flexGrow: 1, // Allow text area to grow and take available space
                        padding: 2, // Padding for space around text
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: '#fdfa72',
                        // backgroundColor: '#fff' 
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#333", mb: 1 }}>
                        John Doe
                    </Typography>
                    <Typography variant="h7" fontWeight="600" sx={{ color: "#333", mb: 1 }}>
                        Volunteer
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        This is a sample testimonial given by a user. It will be a paragraph long and will be displayed on the website.
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default TestimonialCard;
