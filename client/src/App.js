import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import NotFound from './NotFound'
import SignIn from './SignIn'
import SignUp from './SignUp'
import MyBoard from './MyBoard'
import About from './About'
import Admin from './Admin'
import JobPortal from './JobPortal'
import { MyContext } from "./MyContext";
import Contact from './Contact'
import Research from './Research'

function App() {

  const {user, isLoading} = useContext(MyContext)

  if (isLoading === true) return <div></div>
  
  return (
    <>
      {user === null ? 
        <main>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/signin'>
              <SignIn/>
            </Route>
            <Route exact path='/signup'>
              <SignUp/>
            </Route>
            <Route exact path='/contact'>
              <Contact/>
            </Route>
            <Route exact path='/research'>
              <Research/>
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </main>
        :
        <main>
          <Switch>
            <Route path='/myboard'>
              <MyBoard/>
            </Route>
            <Route exact path='/about'>
              <About/>
            </Route>
            <Route exact path='/admin'>
              <Admin/>
            </Route>
            <Route path='/jobportal'>
              <JobPortal/>
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </main>
      }
    </>
  )
}
export default App
