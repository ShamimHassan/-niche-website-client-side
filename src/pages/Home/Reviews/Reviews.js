import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  // const [isDataLoading, setDataLoading] = useState(false);
  useEffect(()=>{
    fetch("https://boiling-island-95834.herokuapp.com/reviews")
    .then(res => res.json())
    .then(data => setReviews(data))
  }, []);

    // setDataLoading(false);
    let isDataLoading = true;
    if(reviews){
      isDataLoading = false
    };
    const homeReviews = reviews?.slice(0, 6);
    console.log(homeReviews)
  return (
    <>
      <Box sx={{py:5}}>
        <Container>
          <Typography variant="h5" sx={{fontWeight:"bold", mb:3, mt:2, textAlign:"center"}}>Clients Says About us</Typography>
          {
            isDataLoading ? <Box sx={{ display: 'flex', justifyContent:"center" }}>
                <CircularProgress />
              </Box> :          
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {reviews?.map((review) => (
                  <Grid item xs={4} sm={4} md={4} key={review?._id}>
                    <Box sx={{p:3,  boxShadow: 3, bgcolor: 'background.paper', border: 1 }}>
                      <Box sx={{display:"flex", mb:2, alignItems: "center"}}>
                        <img src={review?.clientImg} alt="client" style={{width:"60px"}} />
                        <Box sx={{ml:2}}>
                          <Typography variant="h6" sx={{color:"info.main", fontWeight:"bold"}} display="block">{review?.clientName}</Typography>
                          <Rating name="half-rating" defaultValue={review?.ratings} precision={0.5} readOnly />
                        </Box>
                      </Box>
                      <Typography>{review?.comment}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
          }
        </Container>
      </Box>
    </>
  );
};

export default Reviews;