import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useHistory, useParams, Redirect } from "react-router-dom";
import { MyContext } from "./MyContext";
import Divider from '@mui/material/Divider';
import { useMediaQuery } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Map from "./Map";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function MyBoardDialog() {
  
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [open, setOpen] = useState(true);
  const history = useHistory()
  const params = useParams()
  const {jobs, user, setUser} = useContext(MyContext)

  let selectedJob = ''
  
  if (jobs && jobs.length > 0) {
    selectedJob = user.jobs.find(job => job.id === parseInt(params.id)) 
  }

  const responsibilityList =  selectedJob && selectedJob.responsibilities ? selectedJob.responsibilities.map(responsibility => 
    <li
      key={responsibility.id}
      style={{paddingBottom: '0.9rem', lineHeight: '32px'}}
    >
      {responsibility.obligation}
    </li>
  ) : []

  const qualificationList = selectedJob && selectedJob.qualifications ? selectedJob.qualifications.map(qualification => 
    <li
      key={qualification.id}
      style={{paddingBottom: '0.9rem', lineHeight: '32px'}}
    >
      {qualification.prerequisite}
    </li>
  ) : []
  
  function handleClose() {
    setOpen(false)
    history.push('/myboard')
  }

  function handleClick() {
    fetch(`/userjobsjoin/${selectedJob.id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setUser({...user, jobs: user.jobs.filter(job => job.id !== data.id)})
      history.push('/myboard')
    })
  }

  function handleApplyClick() {
    alert(
      "We appreciate your interest in applying for this job on our platform.\n" +
      "However, for the full application process, please visit an\n" +
      "official website where you can complete real applications seamlessly. Thank you for visiting our application!"
    );
  }
  
  if (!selectedJob) {
    return <Redirect to="/notfound" />;
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
          <img width="30" height="30" src="https://img.icons8.com/color/48/qgenda.png" alt="logo"/>
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
              fontFamily: 'Merriweather Sans', 
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
        <section style={{paddingLeft: isMobile ? '0rem' : '1rem'}}>
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
            <section style={{display: 'flex', alignItems: 'center'}}>
              <DeleteOutlineIcon/>
              <p style={{paddingTop: '0.25rem'}}>Delete Job</p>
            </section>
          </Button>
          <Button
            variant="contained"
            disableRipple
            onClick={handleApplyClick} 
            sx={{ 
              mb: 2 ,
              color: 'white',
              height: '2rem',
              backgroundColor: '#ff9800',
              fontWeight: 'bold',
              boxShadow: 'none',
              marginLeft: '1rem',
              textTransform: 'none',
              fontFamily: 'Merriweather Sans',
              width: '9rem',
              '&:hover': {
                backgroundColor: '#e65100', 
                boxShadow: 'none'
              },
            }}
          >
            <section style={{display: 'flex', alignItems: 'center', marginRight: '1rem'}}>
              <CheckOutlinedIcon/>
              <p style={{paddingTop: '0.25rem'}}>Apply</p>
            </section>
          </Button>
        </section>
      </BootstrapDialog>
    </main>
  )
}
export default MyBoardDialog
