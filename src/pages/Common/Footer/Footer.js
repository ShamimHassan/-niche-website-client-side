import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{background:"#222"}}>
      <Box sx={{mt:5,}}>
        <Container>
          <Grid container spacing={{xs:3, md:4}} columns={{xs:4, md:12}} sx={{color:"white", py:3}}>
            <Grid item xs={2} md={3}>
              <Box sx={{p:3}}>
                <Typography variant="h6" sx={{mb:2}}>NEED TO CHAT?</Typography>
                <Typography variant="body2" >Hotline: (000) 111 - 2222</Typography>                
                <Typography variant="body2" sx={{my:1}}>Text: (000) 111 - 3333</Typography>                
                <Typography variant="body2" >Email: contact@wpthemego.com</Typography>                
              </Box>
            </Grid>
            <Grid item xs={2} md={3}>
              <Box sx={{p:3}}>
                <Typography variant="h6" sx={{mb:2}}>ORDERS & RETURNS</Typography>
                <Typography variant="caption" component="div"><Link className="footer-menu-link" to="/order-status">Order Status</Link></Typography>
                <Typography variant="caption" sx={{my:1}} component="div"><Link className="footer-menu-link" to="/shipping-info">Shipping Information</Link></Typography>
                <Typography variant="caption" component="div"><Link className="footer-menu-link" to="/return-policy">Return Policy</Link></Typography>
              </Box>
            </Grid>
            <Grid item xs={2} md={3}>
              <Box sx={{p:3}}>
                <Typography variant="h6" sx={{mb:2}}>ACCOUNT</Typography>
                <Typography variant="caption" component="div"><Link className="footer-menu-link" to="/my-account">My Account</Link></Typography>
                <Typography variant="caption" sx={{my:1}} component="div"><Link className="footer-menu-link" to="/view-cart">View Cart</Link></Typography>
                <Typography variant="caption" component="div"><Link className="footer-menu-link" to="/wishlist">Wishlist</Link></Typography>
              </Box>
            </Grid>
            <Grid item xs={2} md={3}>
              <Box sx={{p:3}}>
                <Typography variant="h6" sx={{mb:2}}>HELP</Typography>
                <Typography variant="caption" component="div"><Link className="footer-menu-link" to="/faqs">FAQs</Link></Typography>
                <Typography variant="caption" sx={{my:1}} component="div"><Link className="footer-menu-link" to="/gift-card">Gift Card</Link></Typography>
                <Typography variant="caption" component="div"><Link className="footer-menu-link" to="/about-us">About Us</Link></Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{py:3, borderTop:1,  textAlign:'center'}}>
            <Typography variant="caption" sx={{color:"white",}}>
              Copyright &copy; {new Date().getFullYear()} All Right reserve &mdash;
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;