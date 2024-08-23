import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, link: '/home' },
    { text: 'Events', icon: <EventIcon />, link: '/events' },
    { text: 'Achievements', icon: <EmojiEventsIcon />, link: '/achievements' },
    { text: 'Chatbot', icon: <ChatIcon />, link: '/chatbot' },
    { text: 'Admin', icon: <AdminPanelSettingsIcon />, link: '/' }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed" // Make navbar fixed at the top
        sx={{
          backgroundColor: 'white', // Light color for a sober navbar
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '0 20px',
        }}
      >
        <Toolbar>
          {/* Menu Icon for Drawer */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2, color: '#333' }} // Darker color for the icon
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: '#333', // Darker color for the title
              textDecoration: 'none',
              flexGrow: 1,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 600,
              fontSize: '1.5rem',
              display: 'flex', // Add flex for alignment
              alignItems: 'center', // Vertically center the logo and text
            }}
          >
            {/* Circular logo */}
            <Box
              component="img"
              src="https://cdn.prod.website-files.com/5dbfd0c08b3107b843917e24/6017ba951aa635c7c910d37e_Zubin%20Logo.png"
              alt="zubin"
              sx={{
                width: 75,
                height: 75,
                borderRadius: '50%', // Circular shape
                objectFit: 'cover', // Ensure the image fits within the circle properly
                marginRight: '10px', // Space between image and text
              }}
            />
            The Zubin Foundation
          </Typography>

          {/* Profile Icon */}
          {user ? (
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: '#333' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          ) : (
            <div>
              <Link to="/login" style={{ color: '#333', marginRight: 16 }}>Login</Link>
              <Link to="/signup" style={{ color: '#333' }}>Signup</Link>
            </div>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            sx={{ mt: '45px' }}
          >
            <MenuItem onClick={handleProfileClick}>
              <PersonIcon sx={{ marginRight: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ marginRight: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer for Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#ffffff', // White background for the sidebar
            height: '100%',
          }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.link}
                sx={{
                  '&:hover': {
                    borderRight: '5px solid #f9ef1f', // Yellow highlight on the right
                  },
                }}
              >
                <ListItemIcon sx={{ color: '#00416A' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: '#00416A', // Darker text color for sidebar items
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Add some margin to prevent content from being hidden behind the navbar */}
      <Box sx={{ marginTop: '64px' }}> 
        {/* Your page content goes here */}
      </Box>
    </Box>
  );
};

export default Navbar;
