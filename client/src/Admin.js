import React, { useContext } from 'react'
import { MyContext } from "./MyContext";
import LoggedInNavigation from './Navigation/LoggedInNavigation';
import AdminNo from './AdminNo';
import AdminYes from './AdminYes';

function Admin() {

    const {user} = useContext(MyContext)

    return (

        <main>
            <LoggedInNavigation/>
            {user.admin === true ? 
             <AdminYes/>
             :
             <AdminNo/>
            }
        </main>
    )
}
export default Admin