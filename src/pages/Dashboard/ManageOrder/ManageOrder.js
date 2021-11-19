import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from '../../../hooks/useAuth/useAuth';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Modal from '@mui/material/Modal';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
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

const ManageOrder = () => {
  const [orders, setOrders] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deletModalOpen, setConfirmDelete] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const {user} = useAuth();

  useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/orders`)
      .then(res => res.json())
      .then(data => setOrders(data))
    }
  }, [user, updateModalOpen]);

  const handleOpen = (status) => {
    setUpdateModalOpen(true);
    setOrderId(status)
  };
  const handleClose = () => setUpdateModalOpen(false);

  // update order status
  const handelStatus = status => {
    const reqStatus = status.orderStatus;
    const data = {reqStatus, orderStatusId: orderId}
    axios.put("https://boiling-island-95834.herokuapp.com/status-update", data)
    .then(res => {
      if(res.data.modifiedCount=== 1){
        setUpdateModalOpen(false)
      }
    })
    console.log(data)
  };



  // delete order
  const handleDeleteClose = () => {
    setConfirmDelete(false);
  }
  const deleteConfirm = () => {
    setConfirmDelete(false);
    axios.delete(`https://boiling-island-95834.herokuapp.com/delete-order/${orderId}` )
    .then(res => {
      if(res.data.deletedCount){
        setConfirmModal(true);
        const restOrder = orders?.filter(order => order?._id !== orderId);
        setOrders(restOrder)
      }
    })
  }
  const handelDelete = id => {
    setConfirmDelete(true);
    setOrderId(id);
  }



  // console.log(orders)
  return (
    <section>
      

      <Box>
        <Container>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}} align="left">Photo</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Price</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Customer Name</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Customer Email</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Status</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                {
                  orders ?
                  <TableBody>
                  {orders?.map((order) => (
                    <TableRow
                      key={order?._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Link to={`/details/${order?.product._id}`}>
                        <img style={{height:"60px"}} src={order?.product?.img} alt="" />
                      </Link>
                        
                      </TableCell>
                      <TableCell align="left">${order?.product?.price}</TableCell>
                      <TableCell align="left">{order?.name}</TableCell>
                      <TableCell align="left">{order?.email}</TableCell>
                      <TableCell align="left">
                        <Typography variant="button" 
                        sx={{
                          fontWeight:"800",
                          fontSize:"12px",
                          color: `${
                            (order?.status === "Pending" && "orange") || 
                            (order?.status === "Processing" && "navy") ||
                            (order?.status === "On hold" && "darkorange") ||
                            (order?.status === "Failed" && "#ff290b") ||
                            (order?.status === "Refunded" && "#0b8fff") ||
                            (order?.status === "Complete" && "#136303") 
                          }`,
                          display:"block"
                          }}>{order?.status}</Typography>

                          <Button sx={{fontSize:"13px", mt:1, display:"flex", alignItems:"center"}} 
                          variant="contained" 
                          onClick={()=>handleOpen(order?._id)} 
                          color="success">
                            <EditLocationOutlinedIcon sx={{mr:1}} /> Edit
                          </Button>

                      </TableCell>
                      <TableCell align="center">
                        <Button 
                          onClick={()=>handelDelete(order?._id)}
                         variant="contained" color="error" 
                        sx={{borderRadius:0, fontSize:"13px", fontweight:"bold", }}
                        >
                          <DeleteForeverSharpIcon sx={{mr:1}} />
                          Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                :
                  <Typography variant="caption" conponent="h4" color="error" sx={{fontWeight:"bold", textAlign:"center", py:4}}>LODING...</Typography>
                }
              </Table>
            </TableContainer>
        </Container>
      </Box>



    {/* order status update modal */}
      <Modal
        open={updateModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Order Status:
          </Typography>
          <Box sx={{my:3}}> 
            <form onSubmit={handleSubmit(handelStatus)}>
              <select {...register("orderStatus")} className="order-status">
                <option value='Pending'>Pending</option>
                <option value="Processing">Processing</option>
                <option value="On hold">On hold</option>
                <option value="Complete">Complete</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
              <Box sx={{mt:5, display:"flex", justifyContent:"space-between"}}>
              <Button type="submit" sx={{borderRadius:0,}} variant="contained">Update</Button>
              <Button onClick={()=>setUpdateModalOpen(false)} color="secondary" sx={{borderRadius:0,}} variant="contained">Cancel</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>

      {/* delete confirmation modal */}
      <Modal
        open={deletModalOpen}
        onClose={()=>handleDeleteClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="div" sx={{textAlign:"center"}}>
            <DeleteTwoToneIcon  sx={{fontSize:"100px"}} color="error" />
          </Typography>
          <Box sx={{mb:2, textAlign:"center"}}> 
              <Typography>Do you want to DELETE This Order?</Typography>
              <Box sx={{mt:5, display:"flex", justifyContent:"space-between"}}>
              <Button onClick={()=>{handleDeleteClose(false)}} sx={{borderRadius:0,}} variant="contained">Cancel</Button>
              <Button onClick={()=>deleteConfirm()} color="error" sx={{borderRadius:0,}} variant="contained">Detele</Button>
              </Box>
          </Box>
        </Box>
      </Modal>
      {/* delete confirmation modal */}
      <Modal
        open={confirmModal}
        onClose={()=>setConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order DELETE Success!
          </Typography>
          <Box sx={{my:3}}> 
            
              <Box sx={{mt:3, textAlign:"center"}}>
              <Button onClick={()=>{setConfirmModal(false)}} color="success" sx={{borderRadius:0,}} variant="contained">Okay</Button>
              </Box>
          </Box>
        </Box>
      </Modal>


    </section>
  );
};

export default ManageOrder;