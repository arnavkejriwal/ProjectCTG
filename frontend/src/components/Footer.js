import React from 'react';
import { Box, Typography } from '@mui/material';
import {Link} from '@mui/material'
import { Instagram, Facebook, LinkedIn,YouTube } from '@mui/icons-material'

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '20px 0',
                textAlign: 'center',
                borderTop: '1px solid #ddd',
            }}
        >
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                Follow us on:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                <Link href="https://www.facebook.com/zubinfoundation" target="_blank" sx={{ margin: '0 10px' }}>
                  <Facebook sx={{ color: '#3b5998' }}/>    
                </Link>
                <Link href="https://www.instagram.com/zubinfoundation" target="_blank" sx={{ margin: '0 10px' }}>
                    <Instagram sx={{ color: '#e1306c' }}/>
                </Link>
                <Link href="https://www.linkedin.com/company/the-zubin-foundation" target="_blank" sx={{ margin: '0 10px' }}>
                    <LinkedIn sx={{ color: '#0077b5' }}/>    
                </Link>
                <Link href="https://www.youtube.com/channel/UCl-zubinfoundation" target="_blank" sx={{ margin: '0 10px' }}>
                    <YouTube sx={{ color: '#FF0000' }}/>    
                </Link>
            </Box>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
                <Link href="https://zubinfoundation.org" target="_blank" sx={{ color: '#333', textDecoration: 'none' }}>
                    www.zubinfoundation.org
                </Link>
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                © 2024 The Zubin Mahtani Gidumal Foundation Limited. All Rights Reserved.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                Website Developed by Team 15 - Code to Give
            </Typography>
        </Box>
    );
};

export default Footer;