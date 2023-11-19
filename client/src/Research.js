import React, { useEffect, useState } from 'react'
import PersonCard from './PersonCard'
import LoggedOutNavigation from "./Navigation/LoggedOutNavigation";
import Typography from '@mui/material/Typography';

function Research() {

    const [people, setPeople] = useState([])

    useEffect(() => {
        fetch('/people',  {
            headers: {'Accept': 'application/json'}
        })
        .then(response => response.json())
        .then(data => setPeople(data))
    },[])

    const peopleList = people.map(person => <PersonCard key={person.id} person={person}/> )

    return (

        <main>
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
                    variant="h2"
                    sx={{ fontFamily: 'Merriweather Sans', color: '#1F699D', textAlign: 'center' }}
                >
                    The following people have joined Jobify!
                </Typography>
                <Typography
                    variant="h5"
                    color="black"
                    sx={{ fontFamily: 'Merriweather Sans', textAlign: 'center', paddingTop: '1rem' }}
                >
                    {`Jobify Accounts: ${people.length}`}
                </Typography>
            </section>
            <section style={{marginTop: '5rem'}}>
                {peopleList}
            </section>  
        </main>
    )
}
export default Research