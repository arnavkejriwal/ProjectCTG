import React, { useState } from 'react';
import { Grid, Box, Typography, LinearProgress, Tabs, Tab } from '@mui/material'
import Achievement from '../components/Achievement';

function Profile() {
    const [selectedTab, setSelectedTab] = useState('achievements');

    const handleTabChange = (e, v) => {
        setSelectedTab(v);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        console.log({ email, password, name, number, age });
    };

    let content;
    switch (selectedTab) {
    case 'achievements':
        content = (
            <Grid container spacing={2} sx={{mt: 6}}>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Achievement />
                </Grid>
            </Grid>
        )
        break;
    case 'events':
        content = <></>;
        break;
    case 'info':
        content = (
            <Box component="form" onSubmit={handleSave} sx={{ mt: 2, width: { xs: '100%', sm: '60%' }, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', mx: 'auto' }}>
                <TextField
                    label="Email address"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <Box sx={{ mt: 5, width:'100%', display: 'flex', flexDirection:'row', justifyContent:'space-between' }}>
                    <Button variant="contained" color="error" sx={{ mt: 2 }}>
                        Log Out
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Save
                    </Button>
                </Box>
            </Box>
        )
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
                    John Doe
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