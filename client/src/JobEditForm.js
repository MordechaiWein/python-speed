import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from "react-router-dom";
import { MyContext } from "./MyContext";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
      // overflow: 'hidden',
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      // maxHeight: '100%', 
      // marginTop: '10rem'
    },
  }));

const defaultTheme = createTheme();

function JobEditForm({ setEditFLag }) {
  
  const [open, setOpen] = useState(true);
  const history = useHistory()
  const params = useParams()
  const {user, setUser, jobs, setJobs} = useContext(MyContext)
  const isMobile = useMediaQuery('(max-width: 700px)');

  let selectedJob = ''

  if (jobs && jobs.length > 0) {
    selectedJob = jobs.find(job => job.id === parseInt(params.id)) 
  }
  
  function handleClose() {
    setOpen(false)
    history.push('/jobportal')
  }
  
  const [message, setMessage] = useState('')
  
  const [data, setData] = useState({
    company_name: selectedJob.company_name,
    title: selectedJob.title,
    job_description: selectedJob.job_description,
    job_type: selectedJob.job_type,
    industry: selectedJob.industry,
    remote: selectedJob.remote,
    salary: selectedJob.salary,
    location: selectedJob.location,
    longitude: selectedJob.longitude,
    latitude: selectedJob.latitude
  })

  const [errors, setErrors] = useState({
    company_name: '',
    title: '',
    job_description: '',
    job_type: '',
    industry: '',
    remote: '',
    salary: '',
    location: '',
    longitude: '',
    latitude: ''
  })

  function handleEditClick() {
    setEditFLag(false)
  }

  function handleChange(event) {
    setErrors({...errors, [event.target.name] : ''})
    setData({...data,[event.target.name]: event.target.value})
  }

  function remoteNoChange() {
    setErrors({...errors, remote: ''})
    setData({ ...data, remote: false })
  }

  function remoteYesChange() {
    setErrors({...errors, remote: ''})
    setData({ ...data, remote: true })
  }

  function editJob(data) {
    setJobs(jobs.map(job => {
      if (job.id === data.id) {
        return data
      } else {
        return job
      }
    }))
    
    setUser({...user, jobs: user.jobs.map(job => {
      if (job.id === data.id) {
        return data 
      } else {
        return job
      }
    })})
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/jobs/${selectedJob.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          editJob(data)
          history.push('/jobportal')
        })
      } else {
        response.json().then(data => {
          setErrors(data.errors)
          setMessage(data.message)
        })
      }
    })
  }

  return (
    <main>
      <BootstrapDialog 
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll='body'
        fullScreen={isMobile ? true : false}
        sx={{backgroundColor: 'rgba(70, 0, 220, 0.6)', paddingTop: isMobile ? '6.5rem' : ''}}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? '' : '10px',
            borderTopLeftRadius: isMobile ? '12px':  '', 
            borderTopRightRadius: isMobile ? '12px' : ''
          },
        }}
      >
        <DialogContent>
          <main>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Button
                    variant="contained"
                    disableRipple
                    onClick={handleEditClick} 
                    sx={{ 
                      mb: 4 ,
                      color: 'white',
                      height: '3rem',
                      backgroundColor: '#ff9800',
                      fontWeight: 'bold',
                      boxShadow: 'none',
                      textTransform: 'none',
                      fontSize: '1rem',
                      width: '15rem',
                      '&:hover': {
                        backgroundColor: '#ed6c02',
                        boxShadow: 'none'
                      },
                    }}
                  >
                    Go back to Job details
                  </Button>
                  <Typography variant="h4"
                    sx={{
                      fontWeight: 'bold', 
                      fontFamily: 'Merriweather Sans',
                      marginBottom: '4rem'
                    }}
                  >
                    Welcome Admin {user.username}
                  </Typography>
                  <Typography component="h1" variant="h4" sx={{fontWeight: 'bold', fontFamily: 'Merriweather Sans'}}>
                    Job Edit Form
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <FormControl>
                      <FormLabel 
                        {...(errors && errors.remote ? { error: true } : {})}
                        sx={{marginTop: '1rem'}} id="demo-row-radio-buttons-group-label">
                        Remote
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={data.remote ? "yes" : "no"} 
                      >
                        <FormControlLabel 
                          value="yes" 
                          control={<Radio />} 
                          label="Yes"
                          onChange={remoteYesChange}
                        />
                        <FormControlLabel 
                          value="no" 
                          control={<Radio />} 
                          label="No" 
                          onChange={remoteNoChange}
                        />
                      </RadioGroup>
                    </FormControl>
                    <div>
                      <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.remote}</small>   
                    </div>
                    <TextField
                      {...(errors && errors.company_name ? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      value={data.company_name}
                      name="company_name"
                      placeholder='Company name*'
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.company_name}</small>
                    <TextField
                      {...(errors && errors.title ? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      value={data.title}
                      name="title"
                      placeholder='Title*'
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.title}</small>
                    <TextField
                      {...(errors && errors.job_description ? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      multiline
                      rows={4}
                      value={data.job_description}
                      name="job_description"
                      placeholder='Job Description*'
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.job_description}</small>
                    <FormControl fullWidth sx={{ m: 0, mt: 1, minWidth: 120}}>
                      <Select
                        {...(errors && errors.job_type ? { error: true } : {})}
                        value={data.job_type}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        name='job_type'
                        sx={{color: 'black'}}
                      >
                        <Divider/>
                        <MenuItem value='Full Time'>Full Time</MenuItem>
                        <Divider/>
                        <MenuItem value='Part Time'>Part Time</MenuItem>
                      </Select>
                    </FormControl>
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.job_type}</small>
                    <TextField
                      {...(errors && errors.salary ? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      value={data.salary}
                      name="salary"
                      placeholder='Salary*'
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.salary}</small>
                    <TextField
                      {...(errors && errors.location ? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      value={data.location}
                      name="location"
                      placeholder='Location*'
                      id="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.location}</small>
                    <TextField
                      {...(errors && errors.longitude? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      value={data.longitude}
                      name="longitude"
                      placeholder='longitude*'
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.longitude}</small>
                    <TextField
                      {...(errors && errors.latitude ? { error: true } : {})}
                      margin="normal"
                      required
                      fullWidth
                      value={data.latitude}
                      name="latitude"
                      placeholder='latitude*'
                      id="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                    <small style={{color: 'red', fontSize: '1.5rem'}}>{errors && errors.latitude}</small>
                    <FormControl fullWidth sx={{ m: 0, mt: 1, minWidth: 120}}>
                      <Select
                        value={data.industry}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        name='industry'
                        sx={{color: 'black'}}
                        {...(errors && errors.industry ? { error: true } : {})}
                      >
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
                    <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.industry}</small>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ 
                        mt: 3, 
                        mb: message ? 7 : 15, 
                        height: '3.5rem', 
                        backgroundColor: '#1F699D', 
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.5rem'
                      }}
                    >
                      Edit Job
                    </Button>
                    <div style={{display: 'flex', paddingLeft: '2rem'}}>
                      <p 
                        style={{
                          color: 'red', 
                          fontSize: '1.3rem', 
                          paddingBottom: message ? '1rem' : ''
                        }}
                      >
                        {message}
                      </p>
                      {message ?
                        <CloseIcon
                          onClick={() => setMessage('')}
                          sx={{
                            color: 'red',
                            marginTop: isMobile ? '3rem' : '1rem', 
                            marginLeft: isMobile ? '1.5rem' : '3rem', 
                            marginRight: isMobile ? '2rem' : '20rem',
                            '&:hover': {
                              backgroundColor: 'red', 
                              color: 'white',
                              borderRadius: '15px'
                            },
                          }}
                        />
                        :
                        ""
                      }
                    </div>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </main>
        </DialogContent>
      </BootstrapDialog>
    </main>
  )
}
export default JobEditForm












  

