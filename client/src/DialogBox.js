import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useHistory, useParams } from "react-router-dom";
import { MyContext } from "./MyContext";
import Divider from '@mui/material/Divider';
import {useMediaQuery } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Map from "./Map";
import Qualifications from "./Qualifications";
import Tooltip from '@mui/material/Tooltip';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

function DialogBox({ setEditFLag }) {
  
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [open, setOpen] = useState(true);
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [qualificationFlag, setQualificationFlag] = useState(false)
  const history = useHistory()
  const params = useParams()
  const {jobs, setJobs, user, setUser} = useContext(MyContext)

  let selectedJob = ''

  if (jobs && jobs.length > 0) {
    selectedJob = jobs.find(job => job.id === parseInt(params.id)) 
  }

  const responsibilityList = selectedJob && selectedJob.responsibilities ? selectedJob.responsibilities.map(responsibility => 
    <Tooltip 
      key={responsibility.id}
      title={user.admin === true ? 'Delete' : ''} 
      placement="top-start" arrow 
      onClick={() => responsibilityEraseClick(responsibility.id)}
    > 
      <li 
        key={responsibility.id} 
        style={{paddingBottom: '0.9rem', lineHeight: '32px'}}
      >
        {responsibility.obligation}
      </li>
    </Tooltip>

  ) : []

  const qualificationList = selectedJob && selectedJob.qualifications ? selectedJob.qualifications.map(qualification => 
    <Tooltip 
      key={qualification.id}
      title={user.admin === true ? 'Delete' : ''} 
      placement="top-start" arrow 
      onClick={() => qualificationEraseClick(qualification.id)}
    >
      <li
        key={qualification.id}
        style={{paddingBottom: '0.9rem', lineHeight: '32px'}}
      >
        {qualification.prerequisite}
      </li>
    </Tooltip>
    
  ) : []

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function responsibilityEraseClick(id) {
    if (user.admin === true) {
      fetch(`/responsibilities/${id}`, {
        method: 'DELETE'
      })
      .then((response) => {
        if (response.ok) {
          response.json().then(data => {
            deleteResponsibility(data)
          })
        } else {
          response.json().then(data => {
            alert(data.note)
          })
        }
      })
    }  
  }

  function qualificationEraseClick(id) {
    if (user.admin === true) {
      fetch(`/qualifications/${id}`, {
        method: 'DELETE'
      })
      .then((response) => {
        if (response.ok) {
          response.json().then(data => {
            deleteQualification(data)
          })
        } else {
          response.json().then(data => {
            alert(data.note)
          })
        }
      })
    }  
  }

  function deleteQualification(data) {
    const eraseQualification = jobs.map(job => {
      if (job.id === data.job_id) {
        return {...job, qualifications: job.qualifications.filter(qualification => qualification.id !== data.id)}
      } else {
        return job
      }
    })
    setJobs(eraseQualification)

    const userEraseQualification = {...user, jobs: user.jobs.map(job => {
      if (job.id === data.job_id) {
        return {...job, qualifications: job.qualifications.filter(qualification => qualification.id !== data.id)}
      } else {
        return job
      }
    })}
    setUser(userEraseQualification)
  }

  function deleteResponsibility(data) {
    const eraseResponsibility= jobs.map(job => {
      if (job.id === data.job_id) {
        return {...job, responsibilities: job.responsibilities.filter(responsibility => responsibility.id !== data.id)}
      } else {
        return job
      }
    })
    setJobs(eraseResponsibility)

    const userEraseResponsibility = {...user, jobs: user.jobs.map(job => {
      if (job.id === data.job_id) {
        return {...job, responsibilities: job.responsibilities.filter(responsibility => responsibility.id !== data.id)}
      } else {
        return job
      }
    })}
    setUser(userEraseResponsibility)
  }

  function handleEditClick() {
    setEditFLag(true)
  }
  
  function handleClose() {
    setOpen(false)
    history.push('/jobportal')
  }

  function handleClick() {
    fetch(`/jobs/${selectedJob.id}`, {
      method: 'DELETE'
    })
    .then((response) =>  {
      if (response.ok) {
        response.json().then(data => {
          setJobs(jobs.filter(job => job.id !== data.id))
          setUser({...user, jobs: user.jobs.filter(job => job.id !== data.id)})
          alert('🚨 Job deleted successfully.')
          history.push('/jobportal')
        })
      } else {
        response.json().then(data => {
          setMessage(data.message)
        })
      }
    })
  }

  function handleSaveClick() {
    fetch("/userjobsjoin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: user.id,
        job_id: selectedJob.id
      })
    })
    .then((response) => {
      if (response.ok) {
        response.json().then(data => {
          setUser({...user, jobs: [...user.jobs, data]})
          history.push('/myboard')
        })
      } else {
        response.json().then(data => {
          setError(data.error)
        })
      }
    })
  }

  return (
    <main>
      <BootstrapDialog 
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll='body'
        fullScreen={isMobile ? true : false}
        sx={{backgroundColor: 'rgba(70, 0, 220, 0.6)', paddingTop: isMobile ? '6.5rem' : ''}}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? '' : '10px',
            borderTopLeftRadius: isMobile ? '12px':  '', 
            borderTopRightRadius: isMobile ? '12px' : ''
          },
        }}
      >
        <DialogTitle
          sx={{m: 0, pl: isMobile ? 2 : 6, pb:  1.5, pt: 7, alignItems: 'center', display: 'flex' }} 
          id="customized-dialog-title"
        >
          <img width="30" height="30" src="https://img.icons8.com/color/48/qgenda.png" alt="qgenda"/>
          &nbsp;
          <p style={{marginTop: "0.3rem", fontFamily: 'Merriweather Sans', color: '#302a79'}}>
            {selectedJob.company_name} 
          </p>
        </DialogTitle>
        <DialogTitle 
          sx={{m: 0, pl: isMobile ? 2 : 6, pt: 0,fontSize: '2.7rem',fontFamily: 'Merriweather Sans',color: '#440044'}} 
          id="customized-dialog-title"
        >
          {selectedJob.title}
        </DialogTitle>
        <Button
          onClick={handleSaveClick}
          variant="contained"
          disableRipple 
          sx={{
            width: '6rem',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'none',
            textTransform: 'none',
            border: 'solid 0.1px darkgrey',
            fontFamily: 'Merriweather Sans',
            ml: isMobile ? 2 : 6,
            mb: error ? 2 : 5,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#7b1fa2', 
              color: 'white',
              boxShadow: 'none'
            },
          }}
        >
          Save
        </Button>
        {error ? 
          <div style={{display: 'flex', paddingLeft: isMobile ? '1rem' : '3.1rem', alignItems: 'center' }}>
            <ErrorIcon sx={{color: 'red', marginBottom: '0.2rem'}}/>
            &nbsp;
            <p style={{paddingTop: '1rem', color: 'red', fontSize: '1rem'}}>{error}</p> 
            &nbsp;
            <CloseIcon 
              fontSize=""
              sx={{
                color: 'red',
                '&:hover': {
                  backgroundColor: 'red', 
                  color: 'white',
                  borderRadius: '5rem'
                },
              }} 
              onClick={() => setError('')}
            />
          </div>
          :
          ""
        }
        <Divider/>
        <DialogContent>
          <main style={{display: 'flex', justifyContent: 'space-between'  }}>
            <section style={{textAlign: 'center', paddingLeft: isMobile ? '0rem' : '3rem'}}>
              <div style={{fontSize: isMobile ? '' : '1.3rem',fontFamily: 'Merriweather Sans', color: '#440044' }}>
                {selectedJob.job_type}
              </div>
              <div style={{color: '#302a79', fontSize: '1.2rem'}}> 
                job type
              </div>
            </section>
            <section style={{textAlign: 'center'}}>
              <div style={{fontSize: isMobile ? '' : '1.3rem',fontFamily: 'Merriweather Sans', color: '#440044' }}>
                {formatDate(selectedJob.created_at)}
              </div>
              <div style={{color: '#302a79', fontSize: '1.2rem'}}>
                posted on
              </div>
            </section>
            <section style={{textAlign: 'center', paddingRight: isMobile ? '0rem' : '5rem'}} >
              <div style={{fontSize: isMobile ? '' : '1.3rem',fontFamily: 'Merriweather Sans', color: '#440044' }}>
                $ {selectedJob.salary}
              </div>
              <div style={{color: '#302a79', fontSize: '1.2rem'}}>
                salary
              </div>
            </section>
          </main>
          <Divider sx={{paddingTop: '2rem', marginBottom: '4rem'}}/>
          <DialogTitle 
            sx={{m: 0, pl: isMobile ? 0 : 4, pt: 0,fontSize: '1.5rem', fontFamily: 'Merriweather Sans', color: '#440044'}} 
            id="customized-dialog-title"
          >
            Job Tags
          </DialogTitle>
          <Divider sx={{paddingTop: '0rem', marginBottom: '1.5rem'}}/>
          <Button
            variant="contained"
            disableRipple 
            sx={{ 
              mb: 2 ,
              color: 'white',
              height: '2rem',
              backgroundColor: '#40E0D0',
              fontWeight: 'bold',
              boxShadow: 'none',
              textTransform: 'none',
              marginLeft: isMobile ? '' : '2rem',
              fontFamily: 'Merriweather Sans',
              border: 'solid 0.1px darkgrey',
              width: '9rem',
              '&:hover': {
                backgroundColor: '#40E0D0', 
                boxShadow: 'none'
              },
            }}
          >
            {selectedJob.industry}
          </Button>
          <Button
            variant="contained"
            disableRipple 
            sx={{ 
              mb: 2 ,
              color: 'white',
              height: '2rem',
              backgroundColor: 'red',
              fontWeight: 'bold',
              boxShadow: 'none',
              marginLeft: '1rem',
              textTransform: 'none',
              border: 'solid 0.1px darkgrey',
              width: '9rem',
              '&:hover': {
                backgroundColor: 'red', 
                boxShadow: 'none'
              },
            }}
          >
            {selectedJob.remote === true ? 'Remote' : 'Not Remote'}
          </Button>
          <DialogTitle 
            sx={{m: 0, pl: isMobile ? 0 : 4, pt: 4,fontSize: '1.3rem', fontFamily: 'Merriweather Sans', color: '#440044'}} 
            id="customized-dialog-title"
          >
            Job Description
          </DialogTitle>
          <Divider sx={{paddingTop: '0rem', marginBottom: '1.5rem'}}/>
          <p 
            style={{
              marginTop: "0.3rem", 
              fontFamily: 'Merriweather Sans', 
              color: '#440044',
              marginLeft: isMobile ? '' : '2rem',
              fontSize: '1.4rem'
            }}
          >
            Summary
          </p>
          <Typography 
            gutterBottom
            color='text.primary'
            sx={{
              marginLeft: isMobile ? '' : '2rem',
              fontSize: '1.32rem',
              marginRight: isMobile ? '' : '5rem',
              fontFamily: 'Merriweather Sans' 
            }}
          >
            {selectedJob.job_description}
          </Typography>
          <DialogTitle 
            sx={{m: 0, pb: 0, pl: isMobile ? 0 : 4, pt: 6,fontSize: '1.4rem',fontFamily: 'Merriweather Sans',color: '#440044'}} 
            id="customized-dialog-title"
          >
            {responsibilityList.length > 0 ? 'JOB RESPONSIBILITIES:' : ''}
          </DialogTitle>
            <ul 
              style={{
                wordWrap: 'break-word',
                marginLeft: isMobile ? -25 : '0.7rem', 
                fontSize: '18px',
                color: 'rgba(25,4,69,0.9)',
                fontFamily: 'Merriweather Sans',
                marginTop: '1rem',
                marginRight: isMobile ? '' : '7rem'
              }}
            >
              {responsibilityList}
            </ul>
          <DialogTitle 
            sx={{m: 0, pl: isMobile ? 0 : 4, pt: 2,fontSize: '1.4rem',fontFamily: 'Merriweather Sans',color: '#440044'}} 
            id="customized-dialog-title"
          >
            {qualificationList.length > 0 ? 'JOB QUALIFICATIONS:' : ''}
          </DialogTitle>
          <ul 
            style={{
              wordWrap: 'break-word',
              marginLeft: isMobile ? -25 : '0.7rem', 
              fontSize: '18px',
              color: 'rgba(25,4,69,0.9)',
              fontFamily: 'Merriweather Sans',
              marginTop: '1rem',
              marginRight: isMobile ? '' : '7rem'
            }}
          >
            {qualificationList}
          </ul>
          <DialogTitle 
            sx={{m: 0, pl: isMobile ? 0 : 4, pt: 4,fontSize: '1.3rem',fontFamily: 'Merriweather Sans',color: '#440044'}} 
            id="customized-dialog-title"
          >
            Location
          </DialogTitle>
          <Divider sx={{ marginBottom: '1.5rem'}}/>
          <Map selectedJob={selectedJob}/>
          <p 
            style={{
              marginTop: "0.7rem", 
              fontFamily: 'Merriweather Sans', 
              color: '#440044',
              marginLeft: isMobile ? '' : '2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              marginBottom: '0', 
            }}
          >
            {selectedJob.company_name}
          </p>
          <p
            style={{
              fontFamily: 'Merriweather Sans', 
              color: '#302a79',
              marginLeft: isMobile ? '' : '2rem',
              fontSize: '1rem',
            }}
          >
            {selectedJob.location}
          </p>
        </DialogContent>
        {user.admin === true ? 
          <section style={{paddingLeft: isMobile ? '0rem' : '1rem'}}>
            <DialogTitle 
              sx={{pl: isMobile ? 2 : 4 , pt: 4, fontSize: '1.1rem', fontFamily: 'Merriweather Sans', color: '#440044'}} 
              id="customized-dialog-title"
            >
              Admin Actions
            </DialogTitle>
            <Divider sx={{ marginBottom: '1.5rem'}}/>
            <Button
              variant="contained"
              disableRipple 
              onClick={handleClick}
              sx={{ 
                mb: 2 ,
                color: 'white',
                height: '2rem',
                backgroundColor: 'red',
                fontWeight: 'bold',
                boxShadow: 'none',
                textTransform: 'none',
                marginLeft: isMobile ? '1rem' : '2rem',
                fontFamily: 'Merriweather Sans',
                border: 'solid 0.1px darkgrey',
                width: '9rem',
                '&:hover': {
                  backgroundColor: '#c62828', 
                  boxShadow: 'none'
                },
              }}
            >
              <DeleteOutlineIcon/>
            </Button>
            <Button
              variant="contained"
              disableRipple
              onClick={handleEditClick} 
              sx={{ 
                mb: 2 ,
                color: 'white',
                height: '2rem',
                backgroundColor: '#ff9800',
                fontWeight: 'bold',
                boxShadow: 'none',
                marginLeft: '1rem',
                textTransform: 'none',
                width: '9rem',
                '&:hover': {
                  backgroundColor: '#e65100', 
                  boxShadow: 'none'
                },
              }}
            >
              <EditOutlinedIcon/>
            </Button>
            <Button
              variant="contained"
              disableRipple
              onClick={() => setQualificationFlag(!qualificationFlag)} 
              sx={{ 
                mb: 2 ,
                color: 'white',
                height: '2rem',
                backgroundColor: '#4caf50',
                fontWeight: 'bold',
                boxShadow: 'none',
                marginLeft: '1rem',
                textTransform: 'none',
                width: '9rem',
                '&:hover': {
                  backgroundColor: '#2e7d32', 
                  boxShadow: 'none'
                },
              }}
            >
              <AddOutlinedIcon/>
            </Button>
            <div style={{display: 'flex', paddingLeft: '2rem'}}>
              <p
                style={{
                  color: 'red', 
                  fontSize: '1.2rem', 
                  paddingBottom: message ? '1rem' : ''
                }}
              >
                {message}
              </p>
              {message ? 
                <CloseIcon 
                  onClick={() => setMessage('')}
                  sx={{color: 'red',
                    marginTop: isMobile ? '2rem' : '1rem', 
                    marginLeft: isMobile ? '1rem' : '3rem', 
                    marginRight: isMobile ? '2rem' : '20rem',
                    '&:hover': {
                      backgroundColor: 'red', 
                      color: 'white',
                      borderRadius: '15px'
                    },
                  }}
                />
                :
                ""
              }
            </div>
            {qualificationFlag ?
              <Qualifications selectedJob={selectedJob} setQualificationFlag={setQualificationFlag}/>
              : 
              ""
            }
          </section>
          :
          ""
        }
      </BootstrapDialog>
    </main>
  )
}
export default DialogBox












    

  
