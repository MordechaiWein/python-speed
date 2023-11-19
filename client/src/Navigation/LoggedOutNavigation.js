import React, { useState } from 'react';
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

 interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
   window?: () => Window;
  }

const drawerWidth = '100%';

function LoggedOutNavigation(props: Props) {
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
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
        <Link to='/'>
          HOME
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ml: 2, my: 2, mb: 4}}>
        <Link to='signin'>
          LOG IN
        </Link>
      </Typography>
      <Typography variant='h5' sx={{ml: 2, mb: 4}}>
        <Link to='signup'>
          SIGN UP
        </Link>
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
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button  
              sx={{   
                marginRight: '1rem',
                marginTop: '0.7rem',
              }}
            >
              <Link 
                to='/'
                style={{
                  color: '#1F699D',
                  fontSize: '1.5rem', 
                  fontWeight: 'bold'
                }}
              >
                HOME
              </Link>
            </Button>
            <Button  
              sx={{   
                fontSize: '1.2rem', 
                backgroundColor: '#1F699D', 
                marginRight: '1rem',
                marginTop: '0.7rem',
                '&:hover': {
                  backgroundColor: '#1F699D', 
                },
              }}
            >
              <Link 
                to='signin'
                style={{color: '#F5F5F5'}}
              >
                LOG IN
              </Link>
            </Button>
            <Button  
              sx={{ 
                color: '#F5F5F5',  
                fontSize: '1.2rem', 
                backgroundColor: '#1F699D', 
                marginRight: '1rem',
                marginTop: '0.7rem',
                '&:hover': {
                  backgroundColor: '#1F699D', 
                },
              }}
            >
              <Link
                to='signup'
                style={{color: '#F5F5F5'}}
              >
                SIGN UP
              </Link>
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
export default LoggedOutNavigation
