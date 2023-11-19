import React from 'react'
import Typography from '@mui/material/Typography';

function AdminNo() {

    return (

        <main style={{backgroundColor: '#1F699D', minHeight: '100vh'}}>
            <Typography 
                variant='h1'
                sx={{
                    paddingTop: '25vh', 
                    textAlign: 'center', 
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'Merriweather Sans'
                }}
            >
                Sorry, this page is for admins only.
            </Typography>
        </main>
    )
}
export default AdminNo