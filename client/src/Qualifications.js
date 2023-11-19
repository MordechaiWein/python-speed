import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MyContext } from "./MyContext";
import Divider from '@mui/material/Divider';

const defaultTheme = createTheme();

function Qualifications({ selectedJob, setQualificationFlag }) {
    
    const {jobs, setJobs, user, setUser} = useContext(MyContext)
    const [qualification, setQualification] = useState('')
    const [responsibility, setResponsibility] = useState('')
    const [responsibilityError, setResponsibilityError] = useState('')
    const [qualificationError, setQualificationError] = useState('')

    function handleQualificationChange(e) {
        setQualification(e.target.value)
        setQualificationError('')
    }

    function handleResponsibilityChange(e) {
        setResponsibility(e.target.value)
        setResponsibilityError('')
    }

    function postQualification(data) {
        const addQualification = jobs.map(job => {
            if (job.id === data.job_id) {
                return {...job, qualifications: job && job.qualifications ? [...job.qualifications, data] : [data]}
            } else {
                return job
            }
        })
        setJobs(addQualification)

        const userAddQualification = {...user, jobs: user.jobs.map(job => {
            if (job.id === data.job_id) {
                return {...job, qualifications: [...job.qualifications, data]}
            } else {
                return job
            }
        })}
        setUser(userAddQualification)
    }

    function postResponsibility(data) {
        const addResponsibility = jobs.map(job => {
            if (job.id === data.job_id) {
                return {...job, responsibilities: job && job.responsibilities ? [...job.responsibilities, data] : [data]}
            } else {
                return job
            }
        })
        setJobs(addResponsibility)

        const userAddResponsibility = {...user, jobs: user.jobs.map(job => {
            if (job.id === data.job_id) {
                return {...job, responsibilities: [...job.responsibilities, data]}
            } else {
                return job
            }
        })}
        setUser(userAddResponsibility)
    }

    function handleQualificationSubmit(e) {
        e.preventDefault()
        fetch('/qualifications', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                prerequisite: qualification,
                job_id: selectedJob.id
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    postQualification(data)
                    setQualificationFlag(false)
                })
            } else {
                response.json().then(data => {
                    setQualificationError(data.error)
                })
            }
        })
    }

    function handleResponsibilitySubmit(e) {
        e.preventDefault()
        fetch('/responsibilities', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                obligation: responsibility,
                job_id: selectedJob.id
            })
        })
        .then((response) => {
            if (response.ok) {
                response.json().then(data => {
                    postResponsibility(data)
                    setQualificationFlag(false)
                })
            } else {
                response.json().then(data => {
                    setResponsibilityError(data.error)
                })
            }
        })
    }


    return (
    
        <>
            <Divider/>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="md">
                    <CssBaseline />
                    <Box sx={{marginTop: '3rem',display: 'flex',flexDirection: 'column'}}>
                        <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', fontFamily: 'Merriweather Sans'}}>
                            Add a Requirement
                        </Typography>
                        <Box component="form" onSubmit={handleQualificationSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                {...(qualificationError ? { error: true } : {})}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="qualification"
                                placeholder='Requirement*'
                                autoComplete="off"
                                onChange={handleQualificationChange}
                            />
                            <p style={{color: 'red', fontSize: '1rem'}}>{qualificationError}</p>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ 
                                    mt: 2, 
                                    mb: 5, 
                                    height: '2.8rem',
                                    backgroundColor: '#7b1fa2', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#9c27b0'
                                    },
                                }}
                            >
                                Add Requirement
                            </Button>
                        </Box>
                        <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', fontFamily: 'Merriweather Sans'}}>
                            Add a Responsibility
                        </Typography>
                        <Box component="form" onSubmit={handleResponsibilitySubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                {...(responsibilityError ? { error: true } : {})}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="responsibility"
                                placeholder='Responsibility*'
                                autoComplete="off"
                                onChange={handleResponsibilityChange}
                            />
                            <p style={{color: 'red', fontSize: '1rem'}}>{responsibilityError}</p>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ 
                                    mt: 2, 
                                    mb: 10, 
                                    height: '2.8rem', 
                                    backgroundColor: '#7b1fa2', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#9c27b0'
                                    },
                                }}
                            >
                                Add Responsibility
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>    
        </>
    )
}

export default Qualifications





  







