import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useAuth from '../../hooks/useAuth/useAuth';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({children, ...rest}) => {
  const {user, isUserLoading} = useAuth();

  if(isUserLoading){
    return(
      <Box sx={{ display: 'flex', justifyContent:"center", my:4 }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;