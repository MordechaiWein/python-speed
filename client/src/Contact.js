import React, { useState } from "react";
import LoggedOutNavigation from "./Navigation/LoggedOutNavigation";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useMediaQuery } from '@mui/material';
import emailjs from 'emailjs-com';

emailjs.init('9rKi_2iq-UU_owZi4');

function Contact() {

    const isMobile = useMediaQuery('(max-width: 750px)');
    const [success, setSuccess] = useState('')
    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    
    function sendEmail(e) {
        e.preventDefault()
        emailjs.send('service_kl1q0sk', 'template_dmsjl9q', {
            name: data.name, 
            email: data.email,
            subject: data.subject,
            message: data.message,
        })
        .then(
            setData({
                name: '',
                email: '',
                subject: '',
                message: ''
            }),
            setSuccess('Your message has been sent!')
        )    
    }

    function handleChange(event) {
        setData({...data, [event.target.name]: event.target.value})
    }
  
    return (

        <main style={{paddingLeft: isMobile ? '0.5rem' : '5rem', paddingRight: isMobile ? '0.5rem' : '5rem'}}>
            <LoggedOutNavigation/>
            <section
                style={{
                    backgroundColor: '#F5F5F5',
                    minHeight: '48.5vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '7rem',
                   
                }}
            >
                <Typography
                    variant="h3"
                    color="text.primary"
                    sx={{ fontFamily: 'Merriweather Sans', color: '#1F699D' }}
                >
                    Get in touch
                </Typography>
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ fontFamily: 'Merriweather Sans', textAlign: 'center', paddingTop: '1rem' }}
                >
                    For questions, inquiries, or feedback, please message us below.
                </Typography>
            </section>
            <form onSubmit={sendEmail}>
                <div style={{ display: isMobile ? '' : 'flex', justifyContent: 'space-between'}}>
                    <section style={{ marginTop: '3rem', flex: 1 }}>
                        <label style={{ fontWeight: 'bold' }}>Name</label>
                        <br />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="name"
                            value={data.name}
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Email</label>
                        <br />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            value={data.email}
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <br />
                        <label style={{ fontWeight: 'bold' }}>Subject</label>
                        <br />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="subject"
                            value={data.subject}
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </section>
                    <section
                        style={{
                            marginTop: isMobile ? '' : '3rem',
                            marginLeft: isMobile ? '' : '2rem',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <label style={{ fontWeight: 'bold' }}>Message</label>
                        <br />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="message"
                            value={data.message}
                            autoComplete="email"
                            onChange={handleChange}
                            multiline
                            rows={11}
                            sx={{marginTop: '-0.4rem', marginBottom: '1rem'}}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '4rem'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h3 style={{marginRight: '2rem', color: '#2e7d32'}}>{success}</h3>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    height: '3rem',
                                    backgroundColor: '#1F699D',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </section>
                </div>    
            </form>        
        </main>
    )
}

export default Contact

