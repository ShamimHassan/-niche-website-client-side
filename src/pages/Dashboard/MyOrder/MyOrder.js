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

const MyOrder = () => {
  const [orders, setOrders] = useState(null);
  const [selectedID, setId ] = useState('');
  const {user} = useAuth();
  useEffect(()=>{
    fetch(`https://boiling-island-95834.herokuapp.com/orders/${user.email}`)
    .then(res => res.json())
    .then(data => setOrders(data))
  }, [user]);

  const [open, setOpen] = useState(false);
  const [ConfirmOpen, setConfirmOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleConfirmOpen = () => setConfirmOpen(true);
  const handleConfirmClose = () => setConfirmOpen(false);

  const orderDelete = id => {
    setId(id);
    setOpen(true);
  }
  const handelOrderDelete = () => {
    axios.delete(`https://boiling-island-95834.herokuapp.com/delete-order/${selectedID}` )
    .then(res => {
      if(res.data.deletedCount){
        handleConfirmOpen();
        const restOrder = orders?.filter(order => order?._id !== selectedID);
        setOrders(restOrder)
      }
    })
    setOpen(false)
  }
  if(!orders){
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
                  <TableCell>#ID</TableCell>
                  <TableCell align="right">Photo</TableCell>
                  <TableCell align="right">Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              {
                orders?.length === 0 ? <Typography variant="button" sx={{my:5}}>You did not order at any time. 
                <Link to="/by-cycles" sx={{ml:2, display:"inline-block"}}><strong>Go back to Shop</strong></Link>
                </Typography> :
                <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    key={order?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order?.product?._id}
                    </TableCell>
                    <TableCell align="right"><Link to={`/details/${order?.product?._id}`}><img style={{height:"60px"}} src={order?.product?.img} alt="" /></Link></TableCell>
                    <TableCell align="right">{order?.product?.name}</TableCell>
                    <TableCell align="right">$ {order?.product?.price}</TableCell>
                    <TableCell align="right">{order?.status}</TableCell>
                    <TableCell align="right">
                      <Button onClick={()=>orderDelete(order?._id)} color="error" variant="contained" sx={{fontWeight: "bold", px:3, borderRadius:0}} ><DeleteForeverIcon /></Button>
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
            variant="h6" component="h2">
              Are you sure to DELETE Your Order???
            </Typography>
            <Box sx={{textAlign:"center"}}>
              <Button variant="contained" 
              onClick={()=>handelOrderDelete()} 
              color="error"
              sx={{ fontWeight: "bold", px:3, borderRadius:0}}
              >
                <DeleteForeverIcon /> Delete
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

export default MyOrder;