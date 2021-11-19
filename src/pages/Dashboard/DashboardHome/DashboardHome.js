import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import useAuth from '../../../hooks/useAuth/useAuth';

const DashboardHome = () => {

  
  const {user} = useAuth();
  const [databaseUser, setDatabaseUser] = useState(null);
  useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/users/${user.email}`)
    .then(res => res.json())
    .then(data => setDatabaseUser(data))
    }
    },[user]);


  return (
    <>
     <Box>
        <Container sx={{py:4}}>
          {!databaseUser && "Loading...."}
          {
            databaseUser && <Box sx={{width:"90%", mx:"auto", p:3}} style={{background:"#00000020"}}>
              <Box sx={{ borderRadius:"50%", mx:"auto", display:"flex", alignItems:"center", justifyContent:"center"}} style={{height:"110px", border:"2px solid blue", width:"110px", overflow:"hidden"}}>
                <img src={user.photoURL || "https://i.postimg.cc/9FYQCTyV/user-avatar.jpg"} alt="" style={{width:"100%", height:"100%"}}  />
              </Box>
              <Typography variant="h5" sx={{fontWeight:"bold", border:1, borderColor:"", px:2, py:1, my:2}}>{user.displayName}</Typography>
              <Typography variant="body1">Email: {user.email}</Typography>
              <Box sx={{displsy:"flex", alignItems:"center", justifyContent:"center", my:2}}>
                Email Varification:
                 {
                  user.emailVerified ? <Typography variant="subtitle1" sx={{color:"success.main", display:"inline-block", ml:2, fontWeight:"bold"}}>VARIFIED</Typography> : 
                  <Typography variant="subtitle1" sx={{color:"error.main", display:"inline-block", ml:2, fontWeight:"bold"}}>NOT VARIFIED</Typography>
                }                
              </Box>
              <Box sx={{displsy:"flex", alignItems:"center", justifyContent:"center", my:2}}>
                Your Role:
                 {
                  databaseUser?.userRole ? <Typography 
                  variant="subtitle2" 
                  sx={{color:"success.main", display:"inline-block", ml:1, fontWeight:"bold"}}
                  style={{textTransform:"capitalize"}}>{databaseUser?.userRole}</Typography> : 
                  <Typography variant="subtitle2" sx={{color:"warning.main", display:"inline-block", ml:1, fontWeight:"bold"}}>Visitor</Typography>
                }                
              </Box>
              <Typography variant="body2">Account Created At : {new Date(Number(user?.metadata?.createdAt)).toLocaleDateString()}</Typography>
              <Box sx={{textAlign:"right"}}>
              </Box>
            </Box>
          }
        </Container>
      </Box>


    </>
  );
};

export default DashboardHome;