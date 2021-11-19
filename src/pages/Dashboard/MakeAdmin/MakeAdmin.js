import React, { useState } from 'react';
import { Button, Container, Modal, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
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

const MakeAdmin = () => {
  const { register, handleSubmit, reset,  } = useForm();
  const [confirmModal, setConfirmModal] = useState(false);
  let roleUpdate = false;
  const onSubmit = data => {
    axios.post("https://boiling-island-95834.herokuapp.com/users/admin", data)
    .then(res => {
      reset();
      setConfirmModal(true);
      roleUpdate = true;
    })
  };

  return (
    <>
      <section>
      <Container >
        <Typography variant="h3" sx={{textAlign:"center", color:"green", fontWeight:600}}>Make an Admin:</Typography>
        <Box sx={{py:4}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box sx={{width:"50%", mx:"auto"}} >
                <Typography variant="body2" sx={{mb:2}}>Add an Email address to make it admin</Typography>
                <TextField {...register("adminRequestEmail", { required: true })} id="outlined-basic" fullWidth label="Add an Email" size="small" variant="outlined" />
                <Button variant="contained" type="submit" sx={{my:2, fontWeight:600}}>Make Admin</Button>
              </Box>
            </Box>
          </form>
        </Box>
        {
          roleUpdate &&  <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">This is a success alert — check it out!</Alert>
        </Stack>
        }
      </Container>
    </section>

    {/* admin added confirmation modal */}
    <Modal
        open={confirmModal}
        onClose={()=>setConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Admin Added Successfully
          </Typography>
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

export default MakeAdmin;