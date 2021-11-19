import { Container, Grid, Typography,  } from '@mui/material';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Bike from '../Home/Bike/Bike';
import Navigation from '../Common/Navigation/Navigation';
import Footer from '../Common/Footer/Footer';

const Shop = () => {
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
  return (
    <>
    <Navigation />

    <Box sx={{py:4}}>
      <Container >
      <Typography variant="h4" sx={{pt:3, pb:1, borderBottom:1, mb:3}}>Our Cycles:</Typography>
        {
          bikes ? <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              bikes?.map(bike => <Bike key={bike?._id} bike={bike} goSingle={goSingle} />)
            }
          </Grid> 
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

export default Shop;