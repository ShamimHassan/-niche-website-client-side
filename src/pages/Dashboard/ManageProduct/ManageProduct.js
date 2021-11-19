import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth/useAuth';

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

const ManageProduct = () => {
  const [products, setProducts] = useState(null);
  const [productId, setProductId] = useState('');
  const [deletModalOpen, setConfirmDelete] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const {user} = useAuth();

  useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/bikes`)
      .then(res => res.json())
      .then(data => setProducts(data))
    }
  }, [user]);

  // delete order
  const handleDeleteClose = () => {
    setConfirmDelete(false);
  }
  const deleteConfirm = () => {
    setConfirmDelete(false);
    axios.delete(`https://boiling-island-95834.herokuapp.com/bikes/${productId}` )
    .then(res => {
      if(res.data.deletedCount){
        setConfirmModal(true);
        const restProducts = products?.filter(order => order?._id !== productId);
        setProducts(restProducts)
      }
    })
  }
  const handelDelete = id => {
    setConfirmDelete(true);
    setProductId(id);
  }




  return (
    <>
      <Box>
        <Container>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontWeight:"bold"}} align="left">Photo</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Product Name</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Price</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Rating</TableCell>
                    <TableCell sx={{fontWeight:"bold"}} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                {
                  products ?
                  <TableBody>
                  {products?.map((product) => (
                    <TableRow
                      key={product?._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      <Link to={`/details/${product?._id}`}>
                        <img style={{height:"60px"}} src={product?.img} alt="" />
                      </Link>
                        
                      </TableCell>
                      <TableCell align="left">{product?.name}</TableCell>
                      <TableCell align="left">${product?.price}</TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle1" sx={{display:"flex", alignItems:"center"}}>
                        <StarBorderTwoToneIcon sx={{mr:1, color:"orange"}} />{product?.ratings}
                        </Typography>                        
                        </TableCell>
                      <TableCell align="center">
                        <Button 
                          onClick={()=>handelDelete(product?._id)}
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
              <Typography>Do you want to DELETE This Product?</Typography>
              <Box sx={{mt:5, display:"flex", justifyContent:"space-between"}}>
              <Button onClick={()=>{handleDeleteClose(false)}} sx={{borderRadius:0,}} variant="contained">Cancel</Button>
              <Button onClick={()=>deleteConfirm()} color="error" sx={{borderRadius:0,}} variant="contained">Detele</Button>
              </Box>
          </Box>
        </Box>
      </Modal>

      {/* delete done modal */}
      <Modal
        open={confirmModal}
        onClose={()=>setConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product DELETE Success!
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

export default ManageProduct;