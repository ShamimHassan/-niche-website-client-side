import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from "react-hook-form";
import axios from 'axios';
import useAuth from '../../../hooks/useAuth/useAuth';
import { Link } from 'react-router-dom';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';

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
const AddNewCycle = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [addedCycle, setAddedCycle] = useState(null);
  const { register, handleSubmit, reset} = useForm();
  const {user} = useAuth();
  const [isAdded, setAdded] = useState(false);
  const onSubmit = data => {
    data.ratingCount = Math.ceil(Math.random() * 222);
    data.ratings = Math.ceil(Math.random() * 5);
    data.inStok = Math.ceil(Math.random() * 30);
    data.author = user?.email;
    axios.post("https://boiling-island-95834.herokuapp.com/add-bike", data)
    .then(res => {
      if(res.status === 200){
        setConfirmModal(true);
        setAdded(true);
      }
    })
    reset();
  };

  useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/my-added/${user.email}`)
      .then(res => res.json())
      .then(data => setAddedCycle(data))
    }
  }, [user, isAdded]);

  return (
    <>
      <Box >
        <Container>
          <Typography variant="h5" sx={{mb:4, pb:1, pt:3, borderBottom:1}}>Add a New Cycle To Sell:</Typography>
          <Box sx={{border:1, borderColor:"grey.500", px:2, py:4}}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField size="small" fullWidth label="Cycle Name" {...register("name", { required: true })} sx={{mb:2}} variant="filled" />
          <TextField size="small" fullWidth label="Cycle Price" {...register("price", { required: true })} sx={{mb:2}} variant="filled" />
          <TextField size="small" fullWidth label="Category" {...register("category", { required: true })} sx={{mb:2}} variant="filled" />
          
          <TextField
          size="small"
          label="Cycle Short Description"
          multiline
          rows={2} 
          fullWidth
          variant="filled" sx={{mb:2}} 
          {...register("shortDescription", { required: true })} 
        />
          <TextField
          size="small"
          label="Cycle Description"
          multiline
          rows={3} 
          fullWidth
          variant="filled" sx={{mb:2}} 
          {...register("description", { required: true })} 
        />
          <TextField size="small" fullWidth label="Cycle Image Link" {...register("img", { required: true })} sx={{mb:2}} variant="filled" />
          <Box sx={{mt:2}}>
            <Button variant="contained" type="submit" color="success" sx={{py:1, px:4, borderRadius:0}}>Add Cycle</Button>
          </Box>
        </form>
          </Box>
          <Box sx={{my:4}}>
              <Typography variant="button" fontWeight='600' mb="3" component="div">Recently you added</Typography>

              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}} align="left">Photo</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Product Name</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Price</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Rating</TableCell>
                  </TableRow>
                </TableHead>
                {
                  addedCycle ?
                  <TableBody>
                  {addedCycle?.map((cycle) => (
                    <TableRow
                      key={cycle?._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Link to={`/details/${cycle?._id}`}>
                        <img style={{height:"60px"}} src={cycle?.img} alt="" />
                      </Link>
                        
                      </TableCell>
                      <TableCell align="left">{cycle?.name}</TableCell>
                      <TableCell align="left">${cycle?.price}</TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle1" sx={{display:"flex", alignItems:"center"}}>
                        <StarBorderTwoToneIcon sx={{mr:1, color:"orange"}} />{cycle?.ratings}
                        </Typography>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                :
                  <Typography variant="caption" conponent="h4" color="error" sx={{fontWeight:"bold", textAlign:"center", py:4}}>LODING...</Typography>
                }
                {
                  addedCycle?.length === 0 && <Typography variant="caption" conponent="h4" color="warning" sx={{fontWeight:"bold", textAlign:"center", py:4}}>You Naver add a Bike</Typography>
                }
              </Table>
            </TableContainer>
              <Box sx={{my:3}}>
                {
                  addedCycle?.length >0 && <Link to="/dashboard/manage-products" align="center" sx={{textDecoration:"none"}}>
                    <Button variant="contained" color="secondary">Manage Products</Button>
                  </Link>
                }
              </Box>
          </Box>
        </Container>
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
            New Cycle Added Successfully
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

export default AddNewCycle;