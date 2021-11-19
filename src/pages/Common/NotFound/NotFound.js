import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import Navigation from '../Navigation/Navigation';

const NotFound = () => {
  const history = useHistory();
  const handelLink = path =>{
    history.replace(path)
  }
  return (
    <>
    <Navigation></Navigation>
    <Box style={{background:"#222"}}>
    <Container>
      <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center"}} style={{minHeight:"90vh"}}>
          <Box>
            <Typography variant="h1" sx={{fontWeight:"bold",}} style={{color:"white"}}>404</Typography>
            <Typography variant="h3" sx={{fontWeight:"bold", mb:4}} style={{color:"white"}}>OPPs! Page not found</Typography>
            <Button variant="contained" onClick={()=>handelLink("/home")}>Back to home</Button>
          </Box>
      </Box>
    </Container>
    </Box>
    </>
  );
};

export default NotFound;