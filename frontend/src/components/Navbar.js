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
  MenuItem,
  tableBodyClasses
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
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          padding: isSmallScreen ? '0 10px' : '0 20px', // Closer padding on small screens
        }}
      >
        <Toolbar>
          {/* Menu Icon for Drawer */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              marginRight: 2,
              color: '#333', // Darker color for the icon
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          {isSmallScreen ? null : (
            <Typography
              variant="h6"
              component={Link}
              to="/home"
              sx={{
                color: 'black', // Darker color for the title
                textDecoration: 'none',
                flexGrow: 1, // Take up space to push profile to the right
                fontWeight: 'bold',
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
          )}

          {/* Profile Icon - Floated right on small screens */}
          {user ? (
            <Box sx={{ ml: isSmallScreen ? 'auto' : 'none' }}>
              <IconButton onClick={handleProfileMenuOpen}>
                <AccountCircleIcon sx={{ fontSize: 50 }} />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ ml: isSmallScreen ? 'auto' : 'none' }}>
              <Link to="/login" style={{ color: '#333', marginRight: 16 }}>Login</Link>
              <Link to="/signup" style={{ color: '#333' }}>Signup</Link>
            </Box>
          )}

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
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
          {!isSmallScreen ? null : (
            <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              color: '#333', // Darker color for the title
              textDecoration: 'none',
              flexGrow: 1, // Take up space to push profile to the right
              fontFamily: 'Arial, sans-serif',
              fontWeight: 600,
              fontSize: '1.5rem',
              display: 'flex', // Add flex for alignment
              flexDirection: 'column', // Stack elements vertically
              alignItems: 'flex-start', // Align to the left
            }}
          >
            {/* Logo and text in a vertical stack */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column', // Stack logo and text vertically
                alignItems: 'flex-start', // Align content to the left
              }}
            >
              {/* Circular logo */}
              <Box
                component="img"
                src="https://cdn.prod.website-files.com/5dbfd0c08b3107b843917e24/6017ba951aa635c7c910d37e_Zubin%20Logo.png"
                alt="zubin"
                mt={2}
                sx={{
                  width: 75,
                  height: 75,
                  borderRadius: '50%', // Circular shape
                  objectFit: 'cover', // Ensure the image fits within the circle properly
                  marginBottom: '2px', // Space between image and text
                }}
              />
              
              {/* Text below the logo */}
              <Box
                sx={{
                  fontSize: '1 rem', // Adjust text size
                  fontWeight: tableBodyClasses.fontWeightMedium,
                  ml: 2, // Bold text
                }}
              >
                The Zubin Foundation
              </Box>
          
              {/* Horizontal line */}
              <Box
                sx={{
                  width: '100%', 
                  height: '2px', 
                  backgroundColor: '#333', 
                  marginTop: '8px',
                  marginBottom: '12px',
                  backgroundColor: 'white', 
                }}
              />
            </Box>
          </Typography>          
          )}
          <List>
            {menuItems.map((item, index) => (
              ((item.text === "Admin" && user?.isAdmin===false) || (!user && item.text === "Admin")) ? null: (
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
                  <ListItemIcon sx={{ color: '#01a9ff', marginRight: '-10px' }}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: 'rgb(70, 70, 70)', // Darker text color for sidebar items
                      fontSize: '1rem',
                    }}
                  />
                </ListItem>
              )
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
