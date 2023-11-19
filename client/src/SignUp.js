import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoggedOutNavigation from './Navigation/LoggedOutNavigation';
import { MyContext } from "./MyContext";
import { useHistory } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        JOBIFY
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

function SignUp() {

  const history = useHistory()
  const {setUser} = useContext(MyContext)
  const [showPassword, setShowPassword] = useState(false)
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [data, setData] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    email_address: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email_address: ''
  })

  function handleChange(event) {
    setErrors({...errors, [event.target.name] : ''})
    setData({...data, [event.target.name] : event.target.value})
  }
 
  function handleClickShowPassword() {
    setShowPassword(!showPassword)
  } 
  
  function handleMouseDownPassword(event) {
    event.preventDefault()
  }

  function handleSubmit(e) {
    setSignUpLoading(true)
    e.preventDefault() 
    fetch('/signup', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          setUser(data)
          setSignUpLoading(false)
          history.push("/myboard")
        })
      } else {
        response.json().then(data => {
          setErrors(data.errors)
          setSignUpLoading(false)
        })
      }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <LoggedOutNavigation/>
      <Container component="main" maxWidth="xs" sx={{paddingTop: '5rem'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img width="64" height="64" style={{marginBottom: '2rem'}}
            src="https://img.icons8.com/glyph-neue/64/1f699d/goal--v1.png" alt="goal--v1"
          />
          <Typography component="h1" variant="h4" 
            sx={{
              fontWeight: 'bold', 
              color: "#1F699D",
              fontFamily: 'Merriweather Sans',
              fontSize: '2.5rem'
            }}
          >
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              {...(errors && errors.username ? { error: true } : {})}
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              onChange={handleChange}
              placeholder='Username*'
              autoComplete="off"
              InputProps={{
                style: {
                  borderRadius: "16px",
                }
              }}
            />
            <small style={{color: 'red', marginLeft: '0.5rem', fontSize: '1rem'}}>{errors && errors.username}</small>
            <TextField
              {...(errors && errors.password ? { error: true } : {})}
              margin="normal"
              required
              fullWidth
              id="password"
              placeholder='Password*'
              name="password"
              onChange={handleChange}
              autoComplete="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "16px"
                }
              }}
            />
            <small style={{color: 'red', marginLeft: '0.5rem', fontSize: '1rem'}}>{errors && errors.password}</small>
            <TextField
              {...(errors && errors.password ? { error: true } : {})}
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              placeholder='Password Confirmation*'
              name="password_confirmation"
              onChange={handleChange}
              autoComplete="password_confirmation"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "16px",
                }
              }}
            />
            <small style={{color: 'red', marginLeft: '0.5rem', fontSize: '1rem'}}>{errors && errors.password}</small>
            <TextField
              {...(errors && errors.email_address ? { error: true } : {})}
              margin="normal"
              required
              fullWidth
              id="email_address"
              name="email_address"
              onChange={handleChange}
              placeholder='Email Address*'
              autoComplete="email_address"
              InputProps={{
                style: {
                  borderRadius: "16px",
                }
              }}
            />
            <small style={{color: 'red', marginLeft: '0.5rem', fontSize: '1rem'}}>{errors && errors.email_address}</small>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, mb: 2 ,
                borderRadius: "16px", 
                height: '3.3rem',
                backgroundImage: 'linear-gradient(to right, #ba68c8, #1F699D)',
                fontWeight: 'bold',
                fontSize:'1.2rem',
                fontFamily: 'Merriweather Sans'
              }}
            >
              {signUpLoading === true ? 'Loading...' : 'Sign Up'}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4}} />
      </Container> 
    </ThemeProvider>
  )
}

export default SignUp