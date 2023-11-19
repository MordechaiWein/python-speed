import React, { useContext }  from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { MyContext } from "./MyContext";

function NotFound() {
    
    const history = useHistory()
    const {user} = useContext(MyContext)

    function handleOutClick() {
        history.push("/")
    }

    function handleInClick() {
        history.push("/myboard")
    }
  
    return (
        <main style={{ minHeight: '100vh', display: 'flex'}}>
            <Container maxWidth="xl" 
                sx={{
                    marginTop: 25,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <img width="85" height="85" src="https://img.icons8.com/glyph-neue/64/1f699d/goal--v1.png" alt="goal--v1"/>
                <Typography variant="h2" sx={{color: '#1F699D', fontFamily: 'Merriweather Sans', paddingTop: '1.5rem'}}>JOBIFY</Typography>
                <Typography variant="h7" sx={{color: '#1F699D', fontFamily: 'Merriweather Sans'}}>Unlock Your Career Potential</Typography>
                <Typography variant="h4" sx={{color: '#1F699D', paddingTop: '1rem', fontFamily: 'Merriweather Sans', textAlign: 'center'}}>Sorry for the inconvenience.</Typography>
                <Typography variant="h4" sx={{color: '#1F699D', paddingTop: '1rem', fontFamily: 'Merriweather Sans', textAlign: 'center'}}>Page or file not found.</Typography>
                <Typography variant="h5" sx={{color: '#1F699D', paddingTop: '1rem', textAlign: 'center', fontFamily: 'Merriweather Sans'}}>
                    {user === null ? (
                        "Click the button to navigate back to the home page."
                        ):(
                        "Click the button to navigate back to the main page."
                    )}
                </Typography>
                <Button
                    onClick={user === null ? handleOutClick : handleInClick }
                    variant="contained"
                    sx={{
                        marginTop: '2rem',
                        fontWeight: 'bold',
                        backgroundColor: '#1F699D',
                        height: '3.5rem',
                        borderRadius: '25px',
                        fontSize: '1rem',
                        fontFamily: 'Merriweather Sans',
                        '&:hover': {
                            backgroundColor: '#1F699D', 
                          },
                    }}
                >
                    {user === null ? "Back to Home Page" : "Back to Main Page" }
                </Button>
            </Container>
        </main>   
    )
}
export default NotFound
