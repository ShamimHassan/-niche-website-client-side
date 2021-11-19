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


const Login = () => {
  const history = useHistory();
  let location = useLocation();
  const {logInEmail, googleLogin, setError, error} = useAuth();
  const { register, handleSubmit, reset } = useForm();

  let { from } = location.state;
  console.log(from)
  const handelLink = path =>{
    history.push(path)
  }
  const onSubmit = ({loginEmail, loginPassword}) => {
    if(loginEmail !== '' && loginPassword.length >=6){
      setError(null);
      reset();
      logInEmail(loginEmail, loginPassword);
      history.push(from?.length ? from : "/")
    }else{
      setError("Email or Password is not currect!!")
    }
  };
  return (
    <>
      <Navigation />
    <section>      
      <Container sx={{mt:3}}>
        <Grid  container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}  sx={{ alignItems: 'center',}} >
          <Grid item xs={4} sm={4} md={6}>
              <img src="https://i.postimg.cc/KcwdTLzh/login-illustration-letter-cubes-forming-word-36025252.jpg" style={{height:"100px"}} alt="" />
              <form onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", flexGrow: 1}}>
                <Box sx={{my:4}}>
                    <TextField label="Email" fullWidth size="small" {...register("loginEmail")} /> <br />
                </Box>  
                <Box sx={{mb:3}}>
                    <TextField type="password" label="Password" fullWidth  size="small" {...register("loginPassword")} />
                </Box>
                
                <Button type="submit" variant="contained">Log In</Button>
              </form>
              {
                error ?  <Stack sx={{ width: '100%', my:2 }} spacing={2}>
                <Alert severity="error">There is an error — {error}</Alert>
              </Stack> : ""
              }
              <Typography variant="subtitle1" sx={{mt:2}}><Button variant="contained" onClick={()=>googleLogin()}>Login With Google</Button></Typography>
              <Typography variant="subtitle1" sx={{mt:2}}>You Don't have an Account? <Button variant="contained" onClick={()=>handelLink("/register")}>Register</Button></Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={6}>
            <img sx={{height: '100%'}} src="https://i.postimg.cc/HsMF9xcc/login-form-img.png" className="login-img" alt="" />
          </Grid>
        </Grid>
      </Container>
    </section>
    </>
  );
};

export default Login;