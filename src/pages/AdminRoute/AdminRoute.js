import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useAuth from '../../hooks/useAuth/useAuth';
import { Redirect, Route } from 'react-router';

const AdminRoute = ({children, ...rest}) => {
  const {user} = useAuth();

  const [databaseUser, setDatabaseUser] = useState(null);
  useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/users/${user.email}`)
    .then(res => res.json())
    .then(data => setDatabaseUser(data))
    }
    },[user]);
  if(!databaseUser){
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
      databaseUser?.userRole === 'admin' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;