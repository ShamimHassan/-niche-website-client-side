import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button, Container } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth/useAuth';
 
const Navigation = () => {
  const history = useHistory();
  const {user, logOut} = useAuth();
  const handelLogOut = (path) => {
    logOut(path)
  };
  const handelLink = (path) => {
    history.push(path);
  };


  // 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>handleMenuClose(), ()=>handelLink("/profile")}>Profile</MenuItem>
      <MenuItem onClick={()=>handleMenuClose(), ()=>handelLogOut("/")}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button size="large" onClick={()=>handelLink("/home")} color="inherit">Home</Button>
      </MenuItem>
      <MenuItem>
        <Button color="inherit" onClick={()=>handelLink("/dashboard")}>Dashboard</Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );


// console.log(user)
  return (
    <header>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: 'block' } }}
            >
              Motorcycles
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" onClick={()=>handelLink("/home")}>Home</Button>
            {
              user && <Button color="inherit" onClick={()=>handelLink("/dashboard")}>Dashboard</Button>
            }
              {
                user ? <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> :
                <Button onClick={()=>handelLink("/login")} color="inherit">Login</Button>
              }
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>

      {/* <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Container>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <HomeIcon onClick={()=>handelLink("/")} color="inherit" />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Button onClick={()=>handelLink("/")} color="inherit">By Cycle</Button>
                </Typography>
                <Button onClick={()=>handelLink("/home")} color="inherit">Home</Button>
                {
                  user && <Button onClick={()=>handelLink("/dashboard")} color="inherit">Dashboard</Button>
                }
                {
                  user ? <Button onClick={()=>handelLogOut("/")} color="inherit">{user?.displayName} Log Out</Button> :
                  <Button onClick={()=>handelLink("/login")} color="inherit">Login</Button>
                }
              </Toolbar>
              </Container>
            </AppBar>
      </Box> */}

    </header>
  );
};

export default Navigation;