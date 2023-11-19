import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Album() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 15,
            pb: 10,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#1F699D"
              gutterBottom
              sx={{fontFamily: 'Merriweather Sans'}}
            >
              Your work people are here, find your dream job.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 3, marginBottom: '9rem' }} maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item  xs={6} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    height: '20rem',
                  }}
                  image="https://media.istockphoto.com/id/951514270/photo/glad-to-work-with-you.jpg?s=612x612&w=0&k=20&c=cW2NaMJUDQpOxbxsMu314AeeDt76o-Nv4CQCzQXsQkw="
                />
              </Card>
            </Grid>
            <Grid item  xs={6} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    height: '20rem',
                  }}
                  image="https://media.istockphoto.com/id/863497498/photo/i-need-everyone-to-give-me-their-best-ideas.jpg?s=612x612&w=0&k=20&c=NtuxU9998bWMDsZN8QB0Ox-5AlpQ7NoifOhbuXQWcpo="
                />
              </Card>
            </Grid>
            <Grid item  xs={6} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    height: '20rem',
                  }}
                  image="https://media.istockphoto.com/id/1347652268/photo/group-of-colleagues-celebrating-success.jpg?s=612x612&w=0&k=20&c=dojtkf9ItX21j3jtlGOGpbKDs320TTAuofoGnNSZD8Y="
                />
              </Card>
            </Grid>
            <Grid item  xs={6} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    height: '20rem',
                  }}
                  image="https://media.istockphoto.com/id/1356070782/photo/businessman-and-businesswoman-smiling-looking-at-phone.jpg?s=612x612&w=0&k=20&c=XDI9agia8LM24eInT_eEK3-N2XA7MMgmJgzGi6QJgzU="
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  )
}
export default Album