import React, {  } from 'react'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function PersonCard({ person }) {

    return (
        <main style={{marginBottom: '2rem'}}>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <section>
                    <Typography
                        variant="h5"
                        sx={{ fontFamily: 'Merriweather Sans', color: '#1F699D' }}
                    >
                        + {person.username}
                    </Typography>
                </section>
                <section>
                    <Typography
                        variant="h5"
                        sx={{ fontFamily: 'Merriweather Sans', color: '#1F699D', textAlign: 'right',marginRight: '1rem'}}
                    >
                        {person.email}
                    </Typography>
                </section>
            </div>
            <Divider/>
        </main>
    )
}
export default PersonCard