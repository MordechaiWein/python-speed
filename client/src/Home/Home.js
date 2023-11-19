import React from "react";
import LoggedOutNavigation from '../Navigation/LoggedOutNavigation';
import Footer from "./Footer";
import Video from "./Video";
import Album from "./Album";
import Icons from "./Icons";

function Home() {

    return (

        <main>
         <LoggedOutNavigation/> 
         <Video/>
         <Album/>
         <Icons/>
         <Footer/>
        </main>
    )
}

export default Home