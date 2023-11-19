import React, { useState , useContext } from 'react'
import LoggedInNavigation from "./Navigation/LoggedInNavigation";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { MyContext } from "./MyContext";
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import PopUp from './PopUp';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function JobPortal() {
    
    const defaultTheme = createTheme();
    const {jobs} = useContext(MyContext)
    const [selectedIndustryJobs, setSelectedIndustryJobs] = useState(null)
    const [name, setName] = useState('')
    const isMobile = useMediaQuery('(max-width: 600px)');

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    

    const jobsFilteredByIndustry = jobs.filter(job => {
        if (selectedIndustryJobs === null) {
          return true
        }
        return job.industry === selectedIndustryJobs
    })

    const organizedJobList = jobsFilteredByIndustry.filter( job => job.title.toLowerCase().includes(name.toLowerCase()))
    
    const jobLogos = [

        "https://img.icons8.com/color/48/zigbee.png",
        "https://img.icons8.com/color/48/microsoft.png",
        "https://img.icons8.com/fluency/48/logo.png",
        "https://img.icons8.com/color/48/crunchyroll.png",
        "https://img.icons8.com/color/48/shutterstock.png"
    ]

    function handleInputBarChange(event) {
        setName(event.target.value)
    }
  
    function handleChange(event) {
        setSelectedIndustryJobs(event.target.value)      
    }


    return (
        <main>
            <LoggedInNavigation/>
            {jobs.length > 0 ? 
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
                                sx={{fontFamily: 'Merriweather Sans'}}
                            >
                                Jobify Job Portal
                            </Typography>
                            <Typography variant="h5" color="text.secondary" sx={{fontFamily: 'Merriweather Sans'}} paragraph>
                                Continue your job search.
                            </Typography>
                            <Divider/>
                            <TextField
                                onChange={handleInputBarChange}
                                required
                                fullWidth
                                name="animal-search"
                                placeholder='Search a job title...'
                                type="text"
                                id="password"
                                autoComplete="off"
                                style={{
                                    marginBottom: '2rem', 
                                    marginTop: '4rem',
                                    width: '100%'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <FormControl 
                                    sx={{ m: 0, mt: 1, minWidth: 200}}
                                    variant="standard"
                                >
                                    <Select
                                        value={''}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        name='industry'
                                    >
                                        <MenuItem value="">
                                            FILTER BY INDUSTRY
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem value={null}>All Jobs</MenuItem>
                                        <Divider/>
                                        <MenuItem value='tech'>Tech</MenuItem>
                                        <Divider/>
                                        <MenuItem value='healthcare'>Healthcare</MenuItem>
                                        <Divider/>
                                        <MenuItem value='finance'>Finance</MenuItem>
                                        <Divider/>
                                        <MenuItem value='education'>Education</MenuItem>
                                        <Divider/>
                                        <MenuItem value='entertainment'>Entertainment</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Container>
                    </Box>
                    <Container sx={{ py: 3 }} maxWidth="lg">
                        {organizedJobList.length === 0 && jobs.length > 0 ?
                            <Typography 
                                style={{
                                    textAlign: 'center', 
                                    fontSize: '2.5rem',
                                    paddingTop: isMobile ? "" : '7rem',
                                    marginRight: isMobile ? "2rem" : "3rem",
                                    marginBottom: isMobile ? '10rem' : ''
                                }}
                            >
                                <SearchIcon sx={{ fontSize: isMobile ?  60 : 40, marginBottom: isMobile ? "" : '-0.6rem' }}/>
                                &nbsp;
                                {isMobile ? <div></div> : "" }
                                Sorry, we couldn't find any results for that search. Kindly try again.
                            </Typography>
                            : 
                            <Grid container spacing={4}>
                                {organizedJobList.map((job, index) => (
                                    <Grid item key={job.id} xs={12} sm={6} md={4}>
                                        <Link to={`jobportal/${job.id}`}>
                                            <Card
                                                sx={{ 
                                                    height: '22rem', 
                                                    display: 'flex', 
                                                    flexDirection: 'column',  
                                                }}
                                            >
                                                <CardContent sx={{ flexGrow: 1 ,ml: 2}}>
                                                    <img width="48" height="48" src={jobLogos[index % jobLogos.length]} alt="logo"/>
                                                    <Typography gutterBottom variant="h6" component="h2" 
                                                        sx={{fontWeight: 'bold', color: '#49447f', marginLeft: '0.2rem', fontSize: '1.5rem'}}>
                                                        {job.title}
                                                    </Typography>
                                                    <Typography sx={{textDecoration: 'underline', fontSize: '1.2rem'}}>
                                                        {job.company_name}
                                                    </Typography>
                                                    <Typography sx={{paddingTop: "0.5rem"}}>
                                                        {job.location}
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        disableRipple 
                                                        sx={{ 
                                                            mt: 3, mb: 2 ,
                                                            color: 'red',
                                                            height: '2rem',
                                                            backgroundColor: 'mistyrose',
                                                            fontWeight: 'bold',
                                                            boxShadow: 'none',
                                                            textTransform: 'none',
                                                            '&:hover': {
                                                                backgroundColor: 'mistyrose', 
                                                                boxShadow: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {job.remote === true ? '👨🏻‍💻 Remote' : 'Not Remote'}
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        disableRipple 
                                                        sx={{ 
                                                            mt: 3, mb: 2 ,
                                                            color: '#DAA520',
                                                            height: '2rem',
                                                            backgroundColor: '#FFFFD0',
                                                            fontWeight: 'bold',
                                                            boxShadow: 'none',
                                                            textTransform: 'none',
                                                            marginLeft: '4rem',
                                                            border: 'solid 0.1px',
                                                            '&:hover': {
                                                                backgroundColor: '#FFFFD0', 
                                                                boxShadow: 'none'
                                                            },
                                                        }}
                                                    >
                                                        {job.job_type}
                                                    </Button>
                                                </CardContent>
                                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                    <Typography 
                                                        sx={{padding: '0.5rem', color: '#ba68c8', fontWeight: 'bold'}}>
                                                        {job.industry.charAt(0).toUpperCase() + job.industry.slice(1)}
                                                    </Typography>
                                                    <Typography 
                                                        sx={{marginRight: '1rem', color: '#302a79'}}>
                                                        Posted: {formatDate(job.created_at)}
                                                    </Typography>
                                                </div>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        }
                    </Container>
                </main>
            </ThemeProvider>
            :
            <Box 
                sx={{
                    textAlign: 'center', 
                    backgroundColor: '#f5f5f5', 
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column' 
                }}
            >
                <CircularProgress sx={{color: '#1F699D', marginRight: '2.5rem'}}/>
                <Typography 
                    sx={{color: '#1F699D', marginTop: '2rem', fontFamily: 'Merriweather Sans'}} 
                    variant='h4'
                >
                    LOADING...
                </Typography>
            </Box>
            }
            <Route path={'/jobportal/:id'}>
              <PopUp/>
            </Route>
        </main>
    ) 
}
export default JobPortal








 