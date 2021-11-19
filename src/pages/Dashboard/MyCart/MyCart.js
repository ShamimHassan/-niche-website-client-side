import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useAuth from '../../../hooks/useAuth/useAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#910808',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyCart = () => {
  const {user} = useAuth();
  const [addedCarts, setCarts] = useState(null);
  const addedCartLocal = JSON.parse(localStorage.getItem("cart-items"));
  
  useEffect(()=> {
      fetch(`https://boiling-island-95834.herokuapp.com/addtocart/${addedCartLocal}`)
    .then(res => res.json())
    .then(data => {
      setCarts(data)
      console.log(data)
    })
  }, {});


  const [selectedID, setId ] = useState('');

  const [open, setOpen] = useState(false);
  const [ConfirmOpen, setConfirmOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleConfirmOpen = () => setConfirmOpen(true);
  const handleConfirmClose = () => setConfirmOpen(false);

  const cartDelete = id => {
    setId(id);
    setOpen(true);
  }
  const handelCartDelete = () => {
    // axios.delete(`http://localhost:5000/cartdelete/${selectedID}` )
    // .then(res => {
    //   if(res.data.deletedCount === 1){
    //     handleConfirmOpen();
    //     const restCart = addedCarts?.filter(cart => cart?._id !== selectedID);
    //     setCarts(restCart)
    //   }
    // })
    setOpen(false)
  }
  if(!addedCarts){
    return (
      <>
         <Box sx={{ display: 'flex', justifyContent:"center", py:5 }}>
          <CircularProgress />
        </Box>
      </>
    )
  }


  return (
    <>
      <section>
        <Box>
          <Container>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell>#ID</TableCell>
                  <TableCell align="left">Photo</TableCell>
                  <TableCell align="left">Product Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              {
                addedCarts?.length === 0 ? <Typography variant="button" sx={{my:5}}>There is no cart item.
                </Typography> :
                <TableBody>
                {addedCarts?.map((cart, serial) => (
                  <TableRow
                    key={cart?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {serial + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {cart?._id}
                    </TableCell>
                    <TableCell align="left"><Link to={`/details/${cart?._id}`}><img style={{height:"60px"}} src={cart?.img} alt="" /></Link></TableCell>
                    <TableCell align="left">{cart?.name}</TableCell>
                    <TableCell align="left">$ {cart?.price}</TableCell>
                    <TableCell align="left">
                      <Button onClick={()=>cartDelete(cart?._id)} color="error" variant="contained" sx={{fontWeight: "bold", px:3, borderRadius:0}} ><DeleteForeverIcon /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              }
            </Table>
          </TableContainer>
          </Container>
        </Box>

      </section>


      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" 
            sx={{color:"#fff", textAlign:"center", fontWeight:"bold", mb:4 }} 
            variant="h5" component="h2">
              DELETE Functionality Coming Soon!
            </Typography>
            <Box sx={{textAlign:"center"}}>
              <Button variant="contained" 
              onClick={()=>handelCartDelete()} 
              color="error"
              sx={{ fontWeight: "bold", px:3, borderRadius:0}}
              >
                <DeleteForeverIcon /> Okay
              </Button>
              <Button variant="contained" 
              onClick={()=>handleClose()}
              sx={{bgcolor:"#222", fontWeight: "bold", px:3, borderRadius:0, ml:2 }}
              >
                Cancle
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={ConfirmOpen}
        onClose={handleConfirmClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ConfirmOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" 
            sx={{color:"#fff", textAlign:"center", fontWeight:"bold", mb:4 }} 
            variant="h6" component="h2">
              Your Order DELETED Successfully !!!!
            </Typography>
            <Box sx={{textAlign:"center"}}>
              
              <Button variant="contained" 
              onClick={()=>handleConfirmClose()}
              sx={{bgcolor:"#222", fontWeight: "bold", px:3, borderRadius:0, ml:2 }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

    </>
  );
};

export default MyCart;