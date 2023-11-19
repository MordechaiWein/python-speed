import React from 'react'
import Container from '@mui/material/Container';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';

function Icons() {
  
  const isMobile = useMediaQuery('(max-width: 600px)');
  
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="#1F699D"
        gutterBottom
        sx={{fontFamily: 'Merriweather Sans', marginBottom: isMobile ? '5rem' : '10rem'}}
      >
        <Container>
          {isMobile ?
            'Empower Your Career Journey'
            :
            <Divider>Empower Your Career Journey</Divider>
          }
        </Container>
      </Typography>
      <Container 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: isMobile ? '2rem' :  '12rem',
          flexDirection:  isMobile ? 'column' : ''
        }}
      >
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: isMobile ? '2rem' : '' }}>
          <section 
            style={{
              border: 'solid 1.7px',
              padding: '1rem' ,
              borderRadius: '40px',
              width: '5rem',
            }}
          >
            <MarkChatReadOutlinedIcon sx={{fontSize: 35}}/>
          </section> 
          <Typography sx={{color: '#1F699D', fontFamily: 'Kanit'}} variant='h6'>Join your work community</Typography>
        </main>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: isMobile ? '2rem' : '' }}>
          <section 
            style={{
              border: 'solid 1.7px',
              padding: '1rem' ,
              borderRadius: '50px',
              width: '5rem'
            }}
          >
            <DoneOutlinedIcon sx={{fontSize: 35}}/>
          </section>
          <Typography sx={{color: '#1F699D', fontFamily: 'Kanit'}} variant='h6'>Find and apply to jobs</Typography>
        </main>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: isMobile ? '2rem' : '' }}>
          <section 
            style={{
              border: 'solid 1.7px',
              padding: '1rem' ,
              borderRadius: '40px',
              width: '5rem'
            }}
          >
            <ApartmentOutlinedIcon sx={{fontSize: 35}}/>
          </section>
          <Typography sx={{color: '#1F699D', fontFamily: 'Kanit'}} variant='h6'>Search company reviews</Typography>
        </main>
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: isMobile ? '2rem' : '' }}>
          <section 
            style={{
              border: 'solid 1.7px',
              padding: '1rem' ,
              borderRadius: '40px',
              width: '5rem'
            }}
          >
            <LocalAtmOutlinedIcon sx={{fontSize: 35}}/>
          </section>
          <Typography sx={{color: '#1F699D',fontFamily: 'Kanit' }} variant='h6'>Compare salaries</Typography>
        </main>    
      </Container>
    </>
  )
}

export default Icons