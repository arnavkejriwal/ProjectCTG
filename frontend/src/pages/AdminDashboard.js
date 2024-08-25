import * as React from 'react';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { Box, Grid, Card, CardContent, Typography} from '@mui/material';
// import { NumbersIcon, PeopleIcon, TrendingUpIcon, CompareArrowsIcon } from '@mui/icons-material';
import NumbersIcon from '@mui/icons-material/Numbers';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';


const AdminDashboard = () => {
    return (
        <Box sx={{ paddingLeft: '5%', paddingRight: '5%', mt: 5, width:'90%', display:'flex', flexDirection:'column', justifyContent:'center', gap: 2 }}>
                {/* Most Recent Event Info */}
                <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#01a9ff' }}>
                    Insights
                </Typography>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>Monthly Summary</Typography>
                            <br/>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>Events Organised</Typography>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <NumbersIcon style={{ color:'#FDDA0D'}} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" style={{ color: 'grey', fontWeight: 300 }}>6 Events</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>Average Attendace</Typography>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            
                                                <PeopleIcon style={{ color:'#FDDA0D'}} />
                                            
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" style={{ color: 'grey', fontWeight: 300 }}>167 Attendees</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>Most Attended Event</Typography>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                                <TrendingUpIcon style={{ color:'#FDDA0D'}} />
                                            
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" style={{ color: 'grey', fontWeight: 300 }}>
                                                Chai Gathering
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="h6" style={{ fontWeight: 500 }}>Change In Attendance</Typography>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                                <CompareArrowsIcon style={{ color:'#FDDA0D'}} />
                                            
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6" style={{ color: 'grey', fontWeight: 300 }}>15% growth</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Events Analysis Section */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                    Attendance By Event
                                </Typography>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                                    series={[
                                        {
                                            data: [75, 90, 100, 87, 125, 95],
                                            color: '#FDDA0D'
                                        },
                                    ]}
                                    width={325}
                                    height={200}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                    Attendance By Location
                                </Typography>
                                <Box sx={{ height: 200 }}>
                                    <BarChart
                                        series={[
                                            { data: [50, 75, 85], color: '#FDDA0D' }
                                        ]}
                                        height={200}
                                        xAxis={[{ data: ['Kowloon', 'Central', 'Tung Chung'], scaleType: 'band' }]}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                    User Feedback
                                </Typography>
                                <Box sx={{ height: 200 }}>
                                    <BarChart
                                        series={[
                                            { data: [25, 36, 45, 37, 26, 23], color: '#FDDA0D' }
                                        ]}
                                        height={200}
                                        xAxis={[{ data: ['1', '2', '3', '4', '5', '6'], scaleType: 'band' }]}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        </Box>
    );
}

export default AdminDashboard;
