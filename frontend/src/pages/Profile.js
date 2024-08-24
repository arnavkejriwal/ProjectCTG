import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LinearProgress from '@mui/material/LinearProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from  '@mui/material/Typography';


function Profile() {
  const [tabValue, setTabValue] = useState('achievements');
  const [indexValue, setIndexValue] = useState(1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

const handleChangeTabIndex = (index) => {
    setIndexValue(index);
};

let content;
if (tabValue === 'achievements') {
    content = (
        <></>
    );
} else if (tabValue === 'info') {
    content = (
        <></>
    );
}

return (
    <Box style={{display:'flex', flexDirection:'column', width:'100%', height:'100%', justifyContent:'space-between'}}>
        <Box style={{display:'flex', flexDirection:'row', width:'100%', height:'20%', alignItems:'center', maxHeight:'200px', maxWidth:'700px'}}>
            <Grid style={{width:'30%', alignItems:'center', justifyContent:'flexDirection'}}>
                <AccountCircleIcon style={{width:'100%', height:'100%', color:'#0000008a'}}/>
            </Grid>
            <Grid style={{width:'70%', height:'100%', alignItems:'center'}}>
                <Typography style={{width:'50%', height:'100%', paddingBottom:'15px'}}>
                    Display Name
                </Typography>
                <Grid style={{width:'70%', height:'100%'}}>
                    <LinearProgress
                        variant="determinate"
                        value={50}
                        sx={{height:'12px', borderRadius:'5px'}}
                    />
                </Grid>
            </Grid>
        </Box>
        <Box item style={{display:'flex', flexDirection:'row', width:'100%', height:'80%', alignItems:'center', maxHeight:'400px', maxWidth:'700px'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width:'100%'}}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{width:'100%'}}>
                    <Tab label="Achievements" value="achievements" />
                    <Tab label="Personal Info" value="info" />
                </Tabs>
                {content}
            </Box>
        </Box>
    </Box>
  );
}

export default Profile;