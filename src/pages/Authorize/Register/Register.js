import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Navigation from '../../Common/Navigation/Navigation';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth/useAuth';



const Register = () => {
  const history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const {user, registerEmail, setError, error, googleLogin} = useAuth();
  const handelLink = path =>{
    history.push(path || '/')
  }
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = ({regiName, regiEmail, regiPassword, regiRetypePassword}) => {

    if(regiName.length < 3){
      setError("Your Name should be valid!!");
      return;
    }
    if(regiPassword === regiRetypePassword){
      setError(null)
      registerEmail(regiEmail, regiPassword, regiName);
      reset();
      history.push(from || '/')
    }else{
      setError("Password dosen't match!!")
    }
    
  };
  console.log(error, user)
  return (
    <>
      <Navigation />
    <section>      
      <Container sx={{mt:3}}>
        <Grid  container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}  sx={{ alignItems: 'center',}} >
          <Grid item xs={4} sm={4} md={6}>
              <img src="https://i.postimg.cc/8PHhF7LB/regis.png" style={{height:"100px"}} alt="" />
              <form onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", flexGrow: 1}}>
                <Box sx={{my:4}}>
                    <TextField label="Name" type="text" fullWidth size="small" {...register("regiName")} /> <br />
                </Box>  
                <Box sx={{my:4}}>
                    <TextField label="Email" type="email" fullWidth size="small" {...register("regiEmail")} /> <br />
                </Box>  
                <Box sx={{mb:3}}>
                    <TextField type="password" label="Password" fullWidth  size="small" {...register("regiPassword")} />
                </Box>
                <Box sx={{mb:3}}>
                    <TextField type="password" label="Retype-Password" fullWidth  size="small" {...register("regiRetypePassword")} />
                </Box>
                
                <Button type="submit" variant="contained">Register</Button>
              </form>
              {
                error ?  <Stack sx={{ width: '100%', my:2 }} spacing={2}>
                <Alert severity="error">There is an error — {error}</Alert>
              </Stack> : ""
              }
              <Box sx={{py:4}}>
                <Button variant="contained" onClick={()=>googleLogin()}>Register With Google</Button>
              </Box>
              <Typography variant="subtitle1" sx={{mt:2}}>Already have an Account? <Button variant="contained" onClick={()=>handelLink("/login")}>Lon In</Button></Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <img sx={{height: '100%'}} src="https://i.postimg.cc/LsTzdr5B/register.jpg" className="login-img" alt="" />
          </Grid>
        </Grid>
      </Container>
    </section>
    </>
  );
};

export default Register;