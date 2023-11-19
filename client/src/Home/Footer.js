import React from "react"
import 'semantic-ui-css/semantic.min.css';
import {Container, Grid, Header, List,Segment,} from 'semantic-ui-react'
import { NavLink} from "react-router-dom";

function Footer() {

    return (

        <Segment inverted vertical style={{padding: '5em 0em', backgroundColor: '#F5F5F5', color: '#1F699D'}}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Header inverted style={{color: '#1F699D', fontSize: '3.5rem', fontFamily: 'Merriweather Sans'}}>
                                'JOBIFY'
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h3' content='Jobify' style={{color: '#1F699D'}}/>
                            <List link inverted>
                                <List.Item style={{color: '#1F699D'}} as='a'>About / Press</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Awards</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Blog</List.Item>
                                <NavLink to='/research'><List.Item style={{color: '#1F699D'}} as='a'>Research</List.Item></NavLink>
                                <List.Item style={{color: '#1F699D'}} as='a'>Guides</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h3' content='Employers' style={{color: '#1F699D'}} />
                            <List link inverted>
                                <List.Item style={{color: '#1F699D'}} as='a'>Get a Free Employer</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Account</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Employer Center</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header as='h3' inverted style={{color: '#1F699D'}} content='Information'/>
                            <List link inverted>
                                <NavLink to='/contact'><List.Item style={{color: '#1F699D'}} as='a'>Help / Contact Us</List.Item></NavLink>
                                <List.Item style={{color: '#1F699D'}} as='a'>Guidelines</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Terms of Use</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Privacy & Cookies</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Privacy Center</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Do Not Sell Or Share</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>My Information</List.Item>
                                <List.Item style={{color: '#1F699D'}} as='a'>Cookie Consent Tool</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}

export default Footer