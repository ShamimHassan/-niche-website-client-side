import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Button, Modal, Typography } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#222',
  border: '2px solid #666',
  boxShadow: 24,
  p: 4,
  color:"#fff",
  fontWeight:"bold"
};

const ReviewsWrite = () => {
  const {user} = useAuth();
  const [databaseUser, setDatabaseUser] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/users/${user.email}`)
    .then(res => res.json())
    .then(data => setDatabaseUser(data));
    }
    },[user]);
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
      data.clientImg = databaseUser.photo || "https://i.postimg.cc/DfgXwgYz/client.jpg";
      axios.post("https://boiling-island-95834.herokuapp.com/reviews", data)
      .then(res => {
        if(res.status){
          setConfirmModal(true);
          reset();
        }
      })
      console.log(data)
    };

  return (
    <>
      <Box sx={{py:4}}>
        <h2>Write a Reviews</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{mb:2}}>
            <TextField defaultValue={user?.displayName} InputProps={{
            readOnly: true,
          }} {...register("clientName")} fullWidth type="text" placeholder="Your Name" variant="standard" />
          </Box>
          <Box sx={{mb:2}}>
            <TextField {...register("ratings", { min: 1, max: 5 })} fullWidth type="number" placeholder="Ratting e.g. 5" variant="standard" />
          </Box>
          <Box sx={{mb:2}}>
            <TextField
              fullWidth
              label="Write Your Review" 
              {...register("comment", { required: true })} 
              multiline
              rows={4}
              placeholder="Your Review here"
              variant="standard"
            />
          </Box>
          <Box sx={{py:2}}>
            <Button variant="contained" sx={{px:4, borderRadius:0}} color="secondary" type="submit">Submit Review</Button>
          </Box>
        </form>
      </Box>


      {/* admin added confirmation modal */}
    <Modal
        open={confirmModal}
        onClose={()=>setConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center"}}>
            Thank You <em style={{color:"#ff0e22"}}>{databaseUser?.name}</em>
          </Typography>
          <Typography variant="subtitle1" sx={{my:3}}>Your review Added Successfully. Thank you {databaseUser?.name} for your important Comment.</Typography>
          <Box sx={{my:3}}> 
            
              <Box sx={{mt:3, textAlign:"center"}}>
              <Button onClick={()=>{setConfirmModal(false)}} color="success" sx={{borderRadius:0,}} variant="contained">Okay</Button>
              </Box>
          </Box>
        </Box>
      </Modal>


    </>
  );
};

export default ReviewsWrite;