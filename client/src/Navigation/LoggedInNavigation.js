import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { MyContext } from "../MyContext";
import { useHistory } from "react-router-dom";

 interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
   window?: () => Window;
  }

const drawerWidth = '100%';

function LoggedInNavigation(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const {setUser} = useContext(MyContext)
  const history = useHistory()

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  function handleClick() {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(setUser(null), history.push('/'))
  }

  const drawer = (
    <Box sx={{minHeight: '100vh', color: '#1F699D'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant="h6" sx={{ my: 2, ml: 2, fontWeight: 'bold', fontSize: '2rem'}}>
          JOBIFY
        </Typography>
        <CloseIcon onClick={handleDrawerToggle}  fontSize='large' sx={{marginRight: '1.5rem', backgroundColor: '#1F699D', color: '#F5F5F5'}}/>
      </div>
      <Divider />
      <Typography variant='h5' sx={{ml: 2, my: 2, mb: 4}}>
        <Link to='about'>
          ABOUT
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ml: 2, my: 2, mb: 4}}>
        <Link to='myboard'>
          MY BOARD
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ml: 2, mb: 4}}>
        <Link to='jobportal'>
          JOB PORTAL
        </Link>
      </Typography> 
      <Typography variant='h5' sx={{ml: 2, mb: 4}}>
        <Link to='admin'>
          ADMIN
        </Link>
      </Typography> 
      <Typography onClick={handleClick} variant='h5' sx={{ml: 2, mb: 4,  color: 'black'}}>
        LOGOUT
      </Typography> 
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:'white', boxShadow: 'none', color: '#1F699D'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            disableRipple  
          >
            <MenuIcon sx={{marginTop: '0.6rem', fontSize:'4rem'}}/>
            <Typography variant="h4" sx={{fontWeight: 'bold', paddingTop: '0.7rem'}}>&nbsp;JOBIFY</Typography>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', lg: 'flex' }}}>
            <img width="50" height="50" src="https://img.icons8.com/glyph-neue/64/1f699d/goal--v1.png" alt="goal--v1"/>
            <Typography variant="h4" sx={{fontWeight: 'bold', paddingTop: '0.7rem'}}>JOBIFY</Typography>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button  
              sx={{   
                marginRight: '1rem',
                marginTop: '0.7rem',
                '&:hover': {
                  backgroundColor: 'transparent', 
                },
              }}
            >
              <Link 
                to='about'
                style={{
                  color: 'black',
                  fontSize: '1.2rem', 
                  fontFamily: 'Merriweather Sans'
                }}
              >
                About
              </Link>
            </Button>
            <Button  
              sx={{   
                marginRight: '1rem',
                marginTop: '0.7rem',
                '&:hover': {
                   backgroundColor: 'transparent', 
                },
              }}
            >
              <Link 
                to='myboard'
                style={{
                  color: 'black',
                  fontSize: '1.2rem', 
                  fontFamily: 'Merriweather Sans'
                }}
              >
                My Board
              </Link>
            </Button>
            <Button  
              sx={{   
                marginRight: '1rem',
                marginTop: '0.7rem',
                '&:hover': {
                  backgroundColor: 'transparent', 
                },
              }}
            >
              <Link 
                to='jobportal'
                style={{
                  color: 'black',
                  fontSize: '1.2rem', 
                  fontFamily: 'Merriweather Sans'
                }}
              >
                Job Portal
              </Link>
            </Button>
            <Button  
              sx={{ 
                marginRight: '1rem',
                marginTop: '0.7rem',
                '&:hover': {
                  backgroundColor: 'transparent', 
                },
              }}
            >
              <Link
                to='admin'
                style={{
                color: 'black',
                fontSize: '1.2rem', 
                fontFamily: 'Merriweather Sans'
              }}
              >
                Admin
              </Link> 
            </Button>
            <Button 
              disableRipple 
              onClick={handleClick} 
              sx={{ 
                marginRight: '1rem',
                marginTop: '0.7rem',
                color: 'black',
                fontSize: '1.2rem', 
                textDecoration: 'underline #1F699D 3px',
                fontFamily: 'Merriweather Sans',
                '&:hover': {
                  backgroundColor: 'transparent', 
                  color: '#1F699D'
                },
              }}
            >
              Logout   
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
export default LoggedInNavigation
