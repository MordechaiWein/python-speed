import React from "react";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@mui/icons-material/Room';
import { useMediaQuery } from '@mui/material';

const AnyReactComponent = ({ icon }) => <div>{icon}</div>;

function Map({ selectedJob }) {

  const isMobile = useMediaQuery('(max-width: 700px)');

  const defaultProps = {
    center: {
      lat: selectedJob.longitude ? parseFloat(selectedJob.latitude) : 0,
      lng: selectedJob.longitude ? parseFloat(selectedJob.longitude) : 0
 
    },
    zoom: 11
  };

 
  return (
    <div 
      style={{
        marginLeft: isMobile ? '' : '2rem',
        height: isMobile ? '23.3rem' : '21.5rem',
        width: isMobile ? '100%' : '60%',
        borderRadius: '10px',
        borderBottomLeftRadius: '10px', 
        borderBottomRightRadius: '10px', 
        overflow: 'hidden'
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDx-Oq0Uo7ZPjxqvm4JgSlK_ccdzlGFlhk" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ disableDefaultUI: true}} 
      >
        <AnyReactComponent
          lat={selectedJob.longitude ? selectedJob.latitude : 0 }
          lng={selectedJob.longitude ? selectedJob.longitude : 0 }
          // lat={21.3891}
          // lng={39.8579}
          icon={<RoomIcon sx={{ fontSize: '60px', color: '#40E0D0; filter: brightness(0.8) saturate(2)', transform: 'translate(-50%, -100%)' }} />}
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
