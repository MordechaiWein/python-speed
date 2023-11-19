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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useHistory } from "react-router-dom";

const defaultTheme = createTheme();

function AdminYes() {
  
  const {user, jobs, setJobs} = useContext(MyContext)
  const history = useHistory()
  const [data, setData] = useState({
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

  function handleSubmit(e) {
    e.preventDefault()
    fetch("/jobs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          setJobs([...jobs, data])
          history.push('/jobportal')
        })
      } else {
        response.json().then(data => {
          setErrors(data.errors)
        })
      }
    })
  }

  return (
    <main>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
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
              Add a job here
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
                >
                  <FormControlLabel 
                    value="female" 
                    control={<Radio />} 
                    label="Yes"
                    onChange={remoteYesChange}
                  />
                  <FormControlLabel 
                    value="male" 
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
                name="job_description"
                placeholder='Job Description*'
                autoComplete="email"
                onChange={handleChange}
              />
              <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.job_description}</small>
              <FormControl fullWidth sx={{ m: 0, mt: 1, minWidth: 120}}>
                <Select
                  {...(errors && errors.job_type ? { error: true } : {})}
                  value={''}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  name='job_type'
                  sx={{color: data.job_type ? 'black' : 'darkgrey'}}
                >
                  <MenuItem value="">
                   {data.job_type ? data.job_type : 'Job Type*'}
                  </MenuItem>
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
                name="latitude"
                placeholder='latitude*'
                id="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <small style={{color: 'red', fontSize: '1rem'}}>{errors && errors.latitude}</small>
              <FormControl fullWidth sx={{ m: 0, mt: 1, minWidth: 120}}>
                <Select
                  value={''}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  name='industry'
                  sx={{color: data.industry ? 'black' : 'darkgrey'}}
                  {...(errors && errors.industry ? { error: true } : {})}
                >
                  <MenuItem value="">
                    {data.industry ? data.industry : 'Industry*'}
                  </MenuItem>
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
                  mb: 15, 
                  height: '3.5rem', 
                  backgroundColor: '#1F699D', 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                Submit Job
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </main>
  )
}
export default AdminYes












 




 
   
   
     
