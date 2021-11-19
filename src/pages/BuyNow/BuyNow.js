import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, CircularProgress, Container, Grid, Modal, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import Footer from '../Common/Footer/Footer';
import Navigation from '../Common/Navigation/Navigation';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import useAuth from '../../hooks/useAuth/useAuth';
import axios from 'axios';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#222',
  border: '2px solid #666',
  boxShadow: 24,
  p: 4,
  color:"#fff",
  fontWeight:"bold"
};

const BuyNow = () => {
  const {id} = useParams();
  const [confirmModal, setConfirmModal] = useState(false);
    const [bike, setBike] = useState(null);
  const {user} = useAuth();
  const history = useHistory();
  useEffect(()=>{
    fetch(`https://boiling-island-95834.herokuapp.com/details/${id}`)
    .then(res => res.json())
    .then(data => setBike(data))
  }, [id])
  
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = data => {
    data.product = bike;
    data.status = "Pending";
    axios.post("https://boiling-island-95834.herokuapp.com/place-order", data)
        .then( res => {
          if(res?.data?.insertedId) {
            setConfirmModal(true);
            reset();
          }
        })
  };

    const handleClose = path => {
      setConfirmModal(false);
      history.push(path)
    }


  return (
    <>
      <Navigation />
      <Box sx={{py:3}}>
        <Container>
            <Grid container spacing={{xs:3, md: 4}} columns={{xs:4, md:12}} >
              <Grid item xs={4} md={8}>
                <Box>
                  <Typography variant="h6">Billing Address:</Typography>
                </Box>
                <Box sx={{py:3}}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={{xs:3, md: 4}} columns={{xs:4, md:12}} >
                      <Grid item xs={4} md={6}>
                        <Box>
                          <TextField 
                            required 
                            fullWidth  
                            hiddenLabel 
                            {...register("name")} 
                            id="filled-hidden-label-small-111"
                            defaultValue={user?.displayName}
                            variant="filled"
                            size="small" type="text"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box>
                          <TextField 
                            required 
                            fullWidth  
                            hiddenLabel 
                            {...register("email")} 
                            id="filled-hidden-label-small-112"
                            defaultValue={user?.email}
                            variant="filled"
                            size="small" type="email"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box>
                          <TextField  
                            fullWidth  
                            hiddenLabel 
                            {...register("phone", { required: true, minLength: 10 })} 
                            id="filled-hidden-label-small-113"
                            defaultValue="+880"
                            variant="filled"
                            size="small" type="tel"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box>
                          <TextField 
                            required 
                            fullWidth  
                            hiddenLabel 
                            {...register("city")} 
                            id="filled-hidden-label-small-114"
                            placeholder="City"
                            variant="filled"
                            size="small" type="text"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box>
                          <TextField 
                            required 
                            fullWidth  
                            hiddenLabel 
                            {...register("zip")} 
                            id="filled-hidden-label-small-114"
                            placeholder="ZIP Code"
                            variant="filled"
                            size="small" type="number"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={6}>
                        <Box>
                          <TextField 
                            fullWidth  
                            hiddenLabel 
                            {...register("address")} 
                            id="filled-hidden-label-small-114"
                            placeholder="Address"
                            variant="filled"
                            size="small" type="text"
                          />
                        </Box>
                      </Grid>

                    </Grid>
                    
                    <Box sx={{my:2, textAlign:"right"}}>
                      <Button variant="contained" type="submit" sx={{px:4}}>Place Order</Button>
                    </Box>
                  </form>
                </Box>
              </Grid>
              <Grid item xs={4} md={4}>
                  <Box>
                    <Typography variant="h6">Selected Product :</Typography>
                  </Box>
                  {
                    bike ?
                    <Box>
                    <img src={bike?.img} alt="" />
                    <Typography variant="h6" >{bike?.name}</Typography>
                    <Typography variant="h6" sx={{mt:1, fontWeight:"bold", color:"error.main"}}>${bike?.price}</Typography>
                    <Box sx={{display:'flex', alignItems:"center"}}>
                    <Rating
                        sx={{my:1}}
                        name="text-feedback"
                        value={4 || 0}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Typography variant="body2" sx={{ml:1}}>({bike?.ratingCount} reviews)</Typography>
                    </Box>
                    <Typography variant="body2" sx={{my:1}}>{bike?.shortDescription}</Typography>
                    <Typography variant="body2" sx={{my:1}}>Availablity: <Typography variant="body1" conponent="span" display="inline-block" color={bike?.inStok >= 10 ? "success.main" : "warning.main"}>{bike?.inStok} in stoke</Typography></Typography>
                    <Typography variant="body2" sx={{my:1}}>Category: {bike?.category}</Typography>

                  </Box> :
                   <Box sx={{ display: 'flex', justifyContent:"center", py:4 }}>
                   <CircularProgress />
                 </Box>
                   }
              </Grid>
            </Grid>
        </Container>

        {/* order conformaion modal */}
        <Modal
        open={confirmModal}
        onClose={()=>setConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{color:"#fff", textAlign:"center", py:4}} component="h2">
            WELCOME <em style={{color:"#fa4a08"}}>{user?.displayName}</em>
          </Typography>
          <CheckCircleOutlineSharpIcon sx={{fontSize:"70px", display:"block", mx:"auto", mb:3, color:"#26e516"}} />
          <Typography id="modal-modal-title" variant="h5" sx={{color:"#fff", textAlign:"center"}} component="h2">
            Order Placed Successfully!
          </Typography>
          <Box sx={{my:1}}>            
            <Box sx={{mt:5, display:"flex", justifyContent:"space-between"}}>
            <Button variant="contained" color="secondary" onClick={()=>handleClose("/")}>Okay</Button>
            <Button variant="contained" color="success" onClick={()=>handleClose("/dashboard/my-order")}>
              View My Orders
            </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      

      </Box>
      <Footer />
    </>
  );
};

export default BuyNow;