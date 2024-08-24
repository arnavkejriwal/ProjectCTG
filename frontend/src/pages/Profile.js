import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Tabs, Tab } from '@mui/material'


function Profile() {
    const [selectedTab, setSelectedTab] = useState('achievements');

    const handleTabChange = (e, v) => {
        setSelectedTab(v);
    }

    let content;
    switch (selectedTab) {
    case 'achievements':
        content = <></>;
        break;
    case 'events':
        content = <></>;
        break;
    case 'info':
        content = <></>;
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
                <Tabs variant="fullWidth" value={selectedTab} onChange={handleTabChange}>
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