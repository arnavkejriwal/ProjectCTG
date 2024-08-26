import React from 'react';
import { Box, Typography } from '@mui/material';

const testimonialsData = [
    {
        imageUrl: "https://media.istockphoto.com/id/1309696402/photo/headshot-of-mid-adult-british-asian-woman-wearing-hijab.jpg?s=612x612&w=0&k=20&c=gX63iUlxK82_9OiAM9KBeHBN8y2yUIupuQquESwkKiw=",
        name: "Aisha Khan",
        role: "Participant",
        testimonial: "The Chai Gathering was amazing! I felt so welcomed and connected with many women."
    },
    {
        imageUrl: "https://www.spectator.co.uk/wp-content/uploads/2021/01/Charles-Yu-%C2%A9-Tina-Chiou._r1.jpg",
        name: "David Wong",
        role: "Volunteer",
        testimonial: "Volunteering at the mental healthcare camp was incredibly rewarding."
    },
    {
        imageUrl: "https://img.freepik.com/free-photo/cheerful-mixed-race-girl-sweater-walking-park_1262-19109.jpg?t=st=1724620677~exp=1724624277~hmac=b8d96c92d29bc183a302ef2dfb7c340ccc2909470a0ed2bf850553e3cf7b6d26&w=1800",
        name: "Priya Patel",
        role: "Event In-Charge",
        testimonial: "Organizing events like the Chai Gathering is my passion."
    },
    {
        imageUrl: "https://img.freepik.com/free-photo/indian-man-smiling-cheerful-expression-closeup-portrait_53876-129387.jpg",
        name: "Sameer Ahmed",
        role: "Participant",
        testimonial: "The mental healthcare camp was a revelation for me."
    },
    {
        imageUrl: "https://img.freepik.com/free-photo/portrait-beautiful-woman-looking-camera_23-2148204710.jpg?t=st=1724620634~exp=1724624234~hmac=79a28ad31b7223272920d52c7de90557d20da70e84d3094127954e8b0ae7194e&w=2000",
        name: "Maya Thapa",
        role: "Volunteer",
        testimonial: "Being involved in the Zubin Foundation’s events has been deeply fulfilling."
    },
];

const TestimonialCard = ({ imageUrl, name, role, testimonial }) => {
    return (
        <div className="testimonial-card">
            <Box
                sx={{
                    width: { xs: '100%', sm: 300, md: 400 },
                    height: { xs: '400px', sm: '300px' }, // Set a fixed height for the card
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
                        height: { xs: '200px', sm: '100%' }, // Fixed height for mobile view
                        flexShrink: 0, // Prevent the image container from shrinking
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={`${name} smiling`}
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
                        height: { xs: '150px', sm: '100%' }, // Reduced height for text part
                        backgroundColor: '#fdfa72',
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ color: "#333", mb: 1 }}>
                        {name}
                    </Typography>
                    <Typography variant="h7" fontWeight="600" sx={{ color: "#333", mb: 1 }}>
                        {role}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {testimonial}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default TestimonialCard;
export { testimonialsData };