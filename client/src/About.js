import React from "react";
import LoggedInNavigation from "./Navigation/LoggedInNavigation";
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useMediaQuery } from '@mui/material';

function About() {

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <>
            <header style={{backgroundColor: '#e0f2f1', minHeight: '70vh'}}>
                <LoggedInNavigation/>
                <Typography 
                    sx={{
                        fontSize: isMobile? '5rem' : '7.5vw',
                        marginTop: '12rem',
                        marginRight: '12vw',
                        marginLeft: '10vw',
                        color: '#1F699D',
                        fontFamily: 'Merriweather Sans',
                        fontWeight: 'bold',
                        textAlign: isMobile ? 'center' : ''
                    }}
                >
                    Unlocking Potential One Click at a Time.
                </Typography>
            </header>
            <section>
                <Container component="section" maxWidth="lg" sx={{marginTop: 8, marginBottom: 8}}>
                    <CssBaseline />
                    <Typography variant="h3" sx={{fontWeight: 'bold', fontFamily: 'Merriweather Sans', color: '#333'}}>
                        About Us
                    </Typography>
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '3rem', 
                            lineHeight: '2.5rem',
                            fontFamily: 'Merriweather Sans', 
                            color: '#333'
                        }}
                    >
                        Welcome to Jobify, where we are committed to helping 
                        individuals like you unlock your full potential and embark on the journey to a 
                        brighter future. Our mission is simple but powerful: to connect talented 
                        individuals with their dream jobs, one click at a time.
                    </Typography>
                </Container>
            </section>
            <section style={{backgroundColor: '#e0f2f1'}}>
                <Container component="section" maxWidth="lg" sx={{marginTop: 8, color: '#1F699D'}}>
                    <CssBaseline />
                    <Typography variant="h3" sx={{fontWeight: 'bold',paddingTop: '4rem',fontFamily: 'Merriweather Sans'}}>
                        Who We Are
                    </Typography>
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '3rem', 
                            lineHeight: '2.5rem', 
                            fontWeight: 'bold', 
                            fontFamily: 'Merriweather Sans',
                            paddingBottom: '5rem'
                        }}
                    >
                        At Jobify, we understand that finding the perfect job is 
                        not just about securing employment; it's about realizing your aspirations, 
                        achieving your goals, and ultimately, finding fulfillment in your career. 
                        We are a dedicated team of professionals who are passionate about making a 
                        meaningful difference in the lives of job seekers and employers alike.
                    </Typography> 
                </Container>
            </section>
            <section>
                <Container component="section" maxWidth="lg" sx={{marginTop: 8}}>
                    <CssBaseline />
                    <Typography variant="h3" sx={{fontWeight: 'bold', fontFamily: 'Merriweather Sans', color: '#333'}}>
                        Our Vision
                    </Typography>
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '3rem', 
                            lineHeight: '2.5rem', 
                            fontFamily: 'Merriweather Sans', 
                            color: '#333'
                        }}
                    >
                        Our vision is to be the catalyst that transforms job searching into a seamless and 
                        empowering experience. We believe that everyone deserves a chance to thrive in 
                        their chosen profession, and we are here to make that vision a reality. 
                        Whether you're a recent graduate, a seasoned professional looking for a 
                        change, or someone re-entering the workforce, Jobify
                        is your trusted partner on this journey.
                    </Typography>
                </Container>
            </section>
            <section style={{backgroundColor: '#e0f2f1', minHeight: '50vh'}}>
                <Container component="section" maxWidth="lg" sx={{marginTop: 8, color: '#1F699D'}}>
                    <CssBaseline />
                    <Typography variant="h3" sx={{fontWeight: 'bold', paddingTop: '5rem', fontFamily: 'Merriweather Sans'}}>
                        Why Choose Us
                    </Typography>
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '3rem', 
                            lineHeight: '2.5rem', 
                            fontWeight: 'bold', 
                            fontFamily: 'Merriweather Sans'
                        }}
                    >
                        Our platform boasts an extensive and constantly updated database 
                        of job opportunities from various industries and locations. We strive to ensure that 
                        you have access to the most relevant and diverse job listings available.
                    </Typography> 
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '2rem', 
                            lineHeight: '2.5rem', 
                            fontWeight: 'bold', 
                            fontFamily: 'Merriweather Sans'
                        }}
                    >
                        We have designed our website to be intuitive and user-friendly. 
                        Finding, saving, and applying for jobs has never been easier. You can organize your 
                        job search efficiently with our personalized job board feature.
                    </Typography> 
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '2rem', 
                            lineHeight: '2.5rem', 
                            fontWeight: 'bold', 
                            fontFamily: 'Merriweather Sans'
                        }}
                    >
                        We provide you with tools and resources to enhance your job search, 
                        including resume building, interview preparation tips, and career advice. 
                        We empower you to present your best self to potential employers.
                    </Typography> 
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '2rem', 
                            lineHeight: '2.5rem', 
                            fontWeight: 'bold', 
                            fontFamily: 'Merriweather Sans'
                        }}
                    >
                        Your privacy and data security are our top priorities. 
                        We employ the latest security measures to safeguard your personal information and ensure a
                        safe browsing experience.
                    </Typography>
                    <Typography variant="h5"
                        sx={{
                            paddingTop: '2rem', 
                            lineHeight: '2.5rem', 
                            paddingBottom: '7rem', 
                            fontWeight: 'bold', 
                            fontFamily: 'Merriweather Sans' 
                        }}
                    >
                        Join a vibrant community of job seekers, 
                        where you can share experiences, insights, and support one another. 
                        Our customer support team is also available to assist you throughout your journey.
                    </Typography> 
                </Container>
            </section>
            <section>
                <Container component="section" maxWidth="lg" sx={{marginTop: 8}}>
                    <CssBaseline />
                    <Typography variant="h3" sx={{fontWeight: 'bold', fontFamily: 'Merriweather Sans', color: '#333'}}>
                        Join Us on Your Journey
                    </Typography>
                    <Typography variant="h5" 
                        sx={{
                            paddingTop: '3rem', 
                            lineHeight: '2.5rem', 
                            paddingBottom: '10rem', 
                            fontFamily: 'Merriweather Sans',
                            color: '#333' 
                        }}
                    >
                        At Jobify, we believe in the transformative power of opportunity. 
                        We invite you to join us on your path to success. Together, we will unlock your potential, 
                        one click at a time. Your dream job is just a click away. Begin your journey today, 
                        and let's build a brighter future together.
                    </Typography>
                </Container>
            </section>
        </>    
    )
}
export default About








