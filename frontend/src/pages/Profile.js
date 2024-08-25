import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, LinearProgress, Tabs, Tab, TextField, Button } from '@mui/material'
import Achievement, { achievements } from '../components/Achievement';
import { useLogout } from '../hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import FeedbackCard from '../components/FeedbackCard';
import FeedbackForm from '../components/FeedbackForm';

function Profile() {
    const [selectedTab, setSelectedTab] = useState('achievements');

    const user = JSON.parse(localStorage.getItem('user'));

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    const [email, setEmail] = useState("");

    const [name, setName] = useState("");

    const [number, setNumber] = useState(0);

    const [age, setAge] = useState("");

    

    const { logout } = useLogout();

    const navigate = useNavigate();

    const handleTabChange = (e, v) => {

        setSelectedTab(v);

    };

    const parseDate = (dateString) => {

        const date = new Date(dateString);

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, '0');

        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;

    };

    const [eventData, setEventData] = useState([]);

    const getEvents = async () => {

        try {

            const response = await fetch('/api/events/get_events');

            const json = await response.json();

            setEventData(json);

            // setBannerData(json); // Set banner data as the complete list of events

        } catch (error) {

            console.error("Error getting event data:", error);

        }

    };

    useEffect(() => {

        if (!eventData.length) {

            getEvents();

        }

    }, [eventData]);

    // Function to get user details by email

    const getUserDetails = async () => {

        try {

            const response = await fetch(`/api/user/${user.email}`, {

                method: 'GET',

                headers: {

                    'Content-Type': 'application/json',

                },

            });

            if (!response.ok) {

                throw new Error('Failed to fetch user details');

            }

            const data = await response.json();

            setEmail(data.email);

            setName(data.name);

            setNumber(data.number);

            setAge(parseDate(data.age));

        } catch (error) {

            console.error('Error:', error.message);

        }

    };

    // Fetch user details on mount

    useEffect(() => {

        getUserDetails();

    }, []); // Empty dependency array ensures this runs only once on mount

    const handleSave = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(`/api/user/${user.email}`, {

                method: 'PATCH', // or 'PUT' based on your API

                headers: {

                    'Content-Type': 'application/json',

                },

                body: JSON.stringify({ email, name, number, age }),

            });

            if (!response.ok) {

                throw new Error('Failed to update user details');

            }

            const data = await response.json();

            console.log('User details updated:', data);

        } catch (error) {

            console.error('Error:', error.message);

        }

    };

    const handleLogout = () => {

        logout();

        navigate('/home');

    };

    let content;
    switch (selectedTab) {
    case 'achievements':
        content = (
            <Grid container spacing={3} sx={{mt: 6}}>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={1}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={2}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={3}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={4}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={5}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={6}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={7}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement id={8}/>
                </Grid>
            </Grid>
        )
        break;
    case 'events':
        if (isFeedbackOpen) {
            <Box sx={{ mt: 2, width: { xs: '100%', sm: '60%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
                content = <FeedbackForm onClose={() => {setIsFeedbackOpen(false)}} />;
            </Box>
        } else {
            content = 
                <Grid container spacing={2} sx={{ mt: 2, width: { xs: '100%', sm: '60%' }, mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>Events joined as Volunteers</Typography>
                    </Grid>
                    {eventData.slice(0, 5).map((event, index) => (
                        <Grid item xs={12} key={index}>
                            <FeedbackCard
                                event={event}
                                onClick={() => setIsFeedbackOpen(true)}
                            />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ mb: 2, mt: 2 }}>Events joined as Participants</Typography>
                    </Grid>
                    {eventData.slice(0, 8).map((event, index) => (
                        <Grid item xs={12} key={index}>
                            <FeedbackCard
                                event={event}
                                onClick={() => setIsFeedbackOpen(true)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ;
        }
        break;
    case 'info':
        content = (
            <Box component="form" onSubmit={handleSave} sx={{ mt: 2, width: { xs: '100%', sm: '60%' }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
                <TextField
                    label="Email address"
                    type="email"
                    fullWidth
                    disabled
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Full Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Phone Number"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <TextField
                    label="Age"
                    type="date"
                    fullWidth
                    disabled
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <Box sx={{ mt: 5, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>
                        Log Out
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Box>
        );
        break;
    default:
        content = null;
        break;
    }

    return (
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Box sx={{mt: 4, mb: 4}}/>
            <Box
                sx={{
                    boxShadow: 10,
                    padding: 3,
                    borderRadius: 2,
                    width: {xs: '80%', sm: '60%', md: '40%'},
                    margin: 'auto',
                    backgroundColor: 'white',
                    border: '3px solid lightgrey',
                    position: 'relative',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                        boxShadow: '0 0 5px 5px lightyellow',
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        width: '40%',
                        height: 15,
                        borderRadius: '10px',
                        border: '2px solid #FDDA0D',
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        top: 40,
                        right: 25,
                        width: '25%',
                        textAlign: 'right',
                        color: 'grey',
                    }}
                >
                    2750 PTS
                </Typography>
                <Box sx={{display:'flex', 
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    position:'absolute',
                    bottom: 10,
                    right: 5}}>
                        <Box sx={{
                            backgroundColor: 'transparent',
                            backgroundImage: `url("/badges/Badge1.png")`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            width: {xs: 30, sm: 40, md: 50},
                            height: 60,
                            position: 'relative',
                            backgroundRepeat: 'no-repeat',
                            mr:'2px'
                            }}>
                        </Box>
                        <Box sx={{
                            backgroundColor: 'transparent',
                            backgroundImage: `url("/badges/Badge6.png")`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            width: {xs: 30, sm: 40, md: 50},
                            height: 60,
                            position: 'relative',
                            backgroundRepeat: 'no-repeat',
                            mr:'2px'
                            }}>
                        </Box>
                        <Box sx={{
                            backgroundColor: 'transparent',
                            backgroundImage: `url("/badges/Badge3.png")`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            width: {xs: 30, sm: 40, md: 50},
                            height: 60,
                            position: 'relative',
                            backgroundRepeat: 'no-repeat'
                            }}>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                position: 'relative',
                                textAlign: 'right',
                                color: 'grey',
                                mr: 3,
                                ml: 1,
                                fontWeight: 'bold'
                            }}
                        >
                            +1
                        </Typography>
                </Box>
                <Box sx={{
                    boxShadow: 4,
                    borderRadius: '50%',
                    border: '3px solid lightgrey',
                    backgroundColor: 'lightgrey',
                    backgroundImage: 'url("https://m.media-amazon.com/images/M/MV5BMDEyMTk5MmEtM2VhYi00ZTYxLTlhZWItZjI0Zjc2NGNhMTk0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU1NzQ0NzY@._V1_.jpg")',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    width: 120,
                    height: 120,
                    position: 'absolute',
                    top: -40,
                }}>
                    <Box sx={{
                        boxShadow: 4,
                        border: '2px solid white',
                        borderRadius: '50%',
                        backgroundColor: '#01a9ff',
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Typography sx={{fontWeight: 'bold', fontSize: '0.8rem', color: 'white'}} >
                            LV5
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        marginTop: 10,
                        marginBottom: 1,
                        textAlign: 'left',
                        fontWeight: 'bold',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'left',
                        color: 'grey',
                    }}
                >
                    Events volunteered: 5
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'left',
                        color: 'grey',
                    }}
                >
                    Events participated: 8
                </Typography>
            </Box>
            <Box sx={{mt: 6, width:{xs: '100%', sm: '100%', md: '70%'} }}>
                <Tabs variant="fullWidth" value={selectedTab} onChange={handleTabChange} sx={{width: { xs: '100%', sm: '60%' }, mx: 'auto'}}>
                    <Tab label="Achievements" value="achievements"/>
                    <Tab label="My Events" value="events"/>
                    <Tab label="Account" value="info"/>
                </Tabs>
                {content}
            </Box>
        </Box>
    );
}

export default Profile;