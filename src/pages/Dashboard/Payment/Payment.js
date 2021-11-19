import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Payment = () => {
  return (
    <>
      <Box sx={{py:3}}>
        <Container>
          <Grid container alignItems="center" spacing={{ xs: 3, md: 3 }} columns={{ xs: 4, md: 12 }}>
            <Grid item xs={4} md={5}>
              <Typography variant="h5" sx={{mb:2, fontWeight:"bold", color:"warning"}} align="center">Payment System</Typography>
              <Typography variant="h3" sx={{fontWeight:"bold"}} align="center">Comming Soon</Typography>
            </Grid>
            <Grid item xs={4} md={7}>
              <img src="https://i.postimg.cc/v8XGDgmD/R.jpg" alt="" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Payment;