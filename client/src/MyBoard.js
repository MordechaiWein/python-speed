import React, { useContext } from 'react'
import LoggedInNavigation from "./Navigation/LoggedInNavigation";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MyContext } from "./MyContext";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import MyBoardDialog from './MyBoardDialog';
import Divider from '@mui/material/Divider';

function MyBoard() {
    
    const defaultTheme = createTheme();
    const {user} = useContext(MyContext)

    const backgroundColors = [

        'rgba(222, 28, 60, 0.85)',
        'rgba(4, 204, 124, 0.85)', 
        'rgba(100, 210, 244, 0.85)', 
        'rgba(18, 237, 123, 0.85)', 
        'rgba(113, 28, 227, 0.85)'
    ]

    return (
        <main>
            <LoggedInNavigation/>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <main>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 15,
                            pb: 6,
                        }}
                    >
                        <Container maxWidth="lg">
                            <Typography
                                component="h1"
                                variant="h2"
                                color="text.primary"
                                gutterBottom
                                sx={{fontFamily: 'Merriweather Sans',}}
                            >
                                Your Jobs
                            </Typography>
                            <Typography variant="h5" color="text.secondary" sx={{fontFamily: 'Merriweather Sans',}} paragraph>
                                Refer here to keep an eye on your saved jobs.
                            </Typography>
                            <Divider/>
                        </Container>
                    </Box>
                    <Container sx={{ py: 3 }} maxWidth="lg">
                        {user.jobs.length === 0 ?
                            <Typography variant='h5'
                                sx={{
                                    fontFamily: 'Merriweather Sans',
                                    lineHeight: 1.7,
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '16px',
                                    padding: ' 2rem'
                                }}
                            >
                                Welcome to Your Board! This is where all your saved jobs will be listed. 
                                Start exploring job opportunities, and when you find one you like, click the
                                'Save' button to add it here. Your saved jobs will appear on this page, 
                                making it easy to keep track of your job prospects.
                           </Typography>
                           :
                            <Grid container spacing={4}>
                                {user.jobs.map((job, index) => (
                                <Grid item key={job.id} xs={12} sm={6} md={4}>
                                    <Link to={`myboard/${job.id}`}>
                                        <Card
                                            sx={{ 
                                                height: '20rem', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                backgroundColor: backgroundColors[index % backgroundColors.length]
                                            }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 ,ml: 0, color: 'white'}}>
                                                <Typography gutterBottom variant="h6" component="h2" 
                                                    sx={{fontWeight: 'bold', fontSize: '2.5rem', wordBreak: 'break-word', mb: 0, pt: 1, lineHeight: 1.2,fontFamily: 'Merriweather Sans', }}>
                                                    {job.title}
                                                </Typography>
                                                <Typography sx={{fontSize: '1.3rem', fontFamily: 'Merriweather Sans'}}>
                                                    {job.company_name}
                                                </Typography>
                                                <Typography sx={{fontSize: '1.3rem', paddingTop: '2.5rem', fontFamily: 'Merriweather Sans', }}>
                                                    {job.industry.charAt(0).toUpperCase() + job.industry.slice(1)} &nbsp; ● &nbsp;{job.job_type} &nbsp;● &nbsp; {job.location}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                                ))}
                            </Grid>
                        }
                    </Container>
                </main>
            </ThemeProvider>
            <Route path={'/myboard/:id'}>
              <MyBoardDialog/>
            </Route>
        </main>            
    ) 
}
export default MyBoard

















