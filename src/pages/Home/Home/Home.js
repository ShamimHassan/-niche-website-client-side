import { Container, Typography, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import Navigation from '../../Common/Navigation/Navigation';
import Grid from '@mui/material/Grid';
import Bike from '../Bike/Bike';
import { useHistory } from 'react-router';
import { Box } from '@mui/system';
import HomeBanner from '../HomeBanner/HomeBanner';
import Reviews from '../Reviews/Reviews';
import Footer from '../../Common/Footer/Footer';

const Home = () => {
  const [bikes, setBike]= useState(null);
  
  const history = useHistory();
  useEffect(()=>{
    fetch("https://boiling-island-95834.herokuapp.com/bikes")
    .then(res => res.json())
    .then(data => setBike(data))
  }, []);

  let isDtaLoading = true;
  if(bikes){
    isDtaLoading = false;
  }

  const goSingle = path => {
    history.push(path);
  };

  const goShop = path => {
    history.push(path)
  }
  return (
    <>
    <Navigation />
    <Box>
      <HomeBanner></HomeBanner>
    </Box>

    <Box sx={{my:3}}>
    <Container>
      <Typography variant="h5" sx={{fontWeight:"bold", my:3}}>Most Recent Cycles</Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        isDtaLoading ? <Box sx={{ display: 'flex', justifyContent:"center", py:4 }}>
          <CircularProgress />
        </Box> :
          
        bikes?.slice(0,6).map(bike => <Bike key={bike?._id} bike={bike} goSingle={goSingle} />)
      }
      </Grid>
    </Container>
    </Box>

    <Box sx={{py:4, bgcolor:"#f1f1f1"}}>
      <Container>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={3}>
            <Box sx={{p:3, textAlign:"center", bgcolor:"#447bd5"}}>
              <img src="https://i.postimg.cc/rytkZdWv/cat-3.png" alt="" />
              <Typography variant="caption" component="div" sx={{color:"#fff", textAlign:"center", my:2}}>Save Up to 70%</Typography>
              <Typography variant="h6" sx={{color:"#fff", textAlign:"center", mb:4}}>All Bike Pumper</Typography>
              <Button onClick={()=> goShop('/by-cycles')} variant="contained" color="warning">Shop Now</Button>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={3}>
            <Box sx={{p:3, textAlign:"center", bgcolor:"#32126c"}}>
              <img src="https://i.postimg.cc/BQTGsdmp/cat-2.png" alt="" />
              <Typography variant="caption" component="div" sx={{color:"#fff", textAlign:"center", my:2}}>The Stylished Head-Ware</Typography>
              <Typography variant="h6" sx={{color:"#fff", textAlign:"center", mb:4}}>Save Uo To 70%</Typography>
              <Button onClick={()=> goShop('/by-cycles')} variant="contained" color="primary">Shop Now</Button>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={3}>
            <Box sx={{p:3, textAlign:"center", bgcolor:"#246363"}}>
              <img src="https://i.postimg.cc/sDdRkV41/cat-4.png" alt="" />
              <Typography variant="caption" component="div" sx={{color:"#fff", textAlign:"center", my:2}}>Summer Gear is Here</Typography>
              <Typography variant="h6" sx={{color:"#fff", textAlign:"center", mb:4}}>The All-New Domane</Typography>
              <Button onClick={()=> goShop('/by-cycles')} variant="contained" color="secondary">Shop Now</Button>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={3}>
            <Box sx={{p:3, textAlign:"center", bgcolor:"#f87726"}}>
              <img src="https://i.postimg.cc/fR5nSYn0/cat-1.png" alt="" />
              <Typography variant="caption" component="div" sx={{color:"#fff", textAlign:"center", my:2}}>Making Every Ride Better</Typography>
              <Typography variant="h6" sx={{color:"#fff", textAlign:"center", mb:4}}>MAXXIS TYRES</Typography>
              <Button onClick={()=> goShop('/by-cycles')} variant="contained" color="info">Shop Now</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

    <Box>
      <Container>
        <Reviews />
      </Container>
    </Box>
    <Footer />
    </>
  );
};

export default Home;