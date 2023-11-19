import React, { useState, useContext } from "react";
import { MyContext } from "./MyContext";
import { Redirect, useParams } from "react-router-dom";
import DialogBox from "./DialogBox";
import JobEditForm from "./JobEditForm";

function PopUp() {

    const [editFlag, setEditFlag] = useState(false)
    const params = useParams()
    const {jobs} = useContext(MyContext)

    const selectedJob = jobs.find(job => job.id === parseInt(params.id)) 

    if (!selectedJob) {
        return <Redirect to="/notfound" />;
    }

    return (

        <main>
            {editFlag === false ?

                <DialogBox setEditFLag={setEditFlag}/>
                :
                <JobEditForm setEditFLag={setEditFlag}/>
            }    
        </main>
    )
}

export default PopUp