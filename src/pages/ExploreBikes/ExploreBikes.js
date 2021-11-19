import { Container, Grid, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Navigation from '../Common/Navigation/Navigation';
import Bike from '../Home/Bike/Bike';
import { Link } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';

const ExploreBikes = () => {
  const [bikes, setBikes] = useState(null);
  const history = useHistory();
  useEffect(()=>{
    fetch("https://boiling-island-95834.herokuapp.com/bikes")
    .then(res => res.json())
    .then(data => setBikes(data))
  }, []);

  const goSingle = path => {
    history.push(path);
  }
  const exploreBikes = bikes?.slice(0, 12);
  return (
    <>
    <Navigation />
      <Box sx={{my:3}}>
      <Container>
        <Typography variant="h4" sx={{pt:3, pb:1, borderBottom:1, mb:3}}>Most Tranding Cycles:</Typography>
        {
          bikes ? <>
           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            exploreBikes?.map(bike => <Bike key={bike?._id} bike={bike} goSingle={goSingle} />)
          }
        </Grid>

        <Box sx={{py:3, textAlign:"center"}}>
          <Link to="/by-cycles" style={{textDecoration:"none"}}><Button variant="contained" sx={{ps:4}}>Load More</Button></Link>
        </Box> 
        </> : 
        <Box sx={{ display: 'flex', justifyContent:"center", py:5 }}>
          <CircularProgress />
        </Box>
            
      }
      </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ExploreBikes;