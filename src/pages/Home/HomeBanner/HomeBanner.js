import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';

const HomeBanner = () => {
  const history = useHistory();
  const goToExplore = path => {
    history.push(path);
  }
  return (
    <section className="home-banner" >
      <Box >
        <Container sx={{display:"flex", alignItems:"center"}}>
          <Box>
            <Typography variant="h3" style={{textTransform:"uppercase", color: 'white'}} sx={{fontWeight: "bold", }} >Mountain Bikes</Typography>
            <Typography variant="body1" style={{color:"white"}} sx={{my:2,}}>Over the hill and through the woods, Team <br /> Gaion takes a rip in our hometown. </Typography>
            <Button onClick={()=> goToExplore("/explore")} variant="contained" sx={{ fontWeight:"bold", px:3, py:1}}>Explore Bikes</Button>
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default HomeBanner;