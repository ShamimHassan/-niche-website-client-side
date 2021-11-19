import { Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Navigation from '../Common/Navigation/Navigation';
import Footer from '../Common/Footer/Footer';

const Detail = () => {
  const {id} = useParams();
  const [bike, setBike] = useState();
  const history = useHistory();
  useEffect(()=>{
    fetch(`https://boiling-island-95834.herokuapp.com/details/${id}`)
    .then(res => res.json())
    .then(data => setBike(data))
  }, [id]);
  console.log(bike?.ratings)
  const handelBuyNow = id => {
    history.push(`/buy/${id}`);
  }
  return (
    <>
      <Navigation />
      <section style={{background:"#99999930", marginTop:"30px"}}>
        
          
          <Container >
          { bike ? <Box>
              <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, md: 12 }} sx={{py:5, mt:5, alignItems: "center", borderBottom: 1, borderColor: 'primary.main' }}>
                <Grid item xs={4} md={5}>
                  <img src={bike?.img} alt="" />
                </Grid>
                <Grid item xs={4} md={7}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{bike?.name}</Typography>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                    <Rating
                      sx={{my:1}}
                      name="text-feedback"
                      value={bike?.ratings || 0}
                      readOnly
                      precision={0.5}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant="body1" sx={{ml:1}}><small>({bike?.ratingCount} reviews)</small></Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', mt:2 }} color="error.main" variant="h6">${bike?.price}</Typography>
                    <Typography sx={{my:2}} variant="body2">{bike?.shortDescription}</Typography>
                    <Button variant="contained" onClick={()=>handelBuyNow(bike?._id)} sx={{bgcolor:"error.main", fontWeight: "bold", px:4}}>Buy Now</Button>
                    <Typography sx={{my:2}} color={bike?.inStok >9 ? `primary.main` : "warning.main"} variant="body2"><small>Available {bike?.inStok} bikes in stok now {bike?.inStok <10 && 'low in stoke'}</small></Typography>
                    <Typography variant="body2">Categories: {bike?.category}</Typography>

                </Grid>
              </Grid>

              <Box sx={{py:3}}>
                <Typography variant="h4" color="primary.main" sx={{mb:3, fontWeight:"bold"}}>Description</Typography>
                <Typography variant="body1">
                  {
                    bike?.description
                  }
                </Typography>
              </Box>
          </Box> 
          :
          <Box sx={{ display: 'flex', justifyContent:"center", py:5 }}>
            <CircularProgress />
          </Box>}



      </Container>
      </section>
      <Footer />
    </>
  );
};

export default Detail;