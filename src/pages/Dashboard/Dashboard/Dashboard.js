import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Button, CircularProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import useAuth from '../../../hooks/useAuth/useAuth';
import MyOrder from '../MyOrder/MyOrder';
import MakeAdmin from "../MakeAdmin/MakeAdmin"
import DashboardHome from "../DashboardHome/DashboardHome"
import { NavLink } from 'react-router-dom';
import ManageOrder from '../ManageOrder/ManageOrder';
import ReviewsWrite from '../ReviewsWrite/ReviewsWrite';
import ManageProduct from '../ManageProduct/ManageProduct';
import RiceBowlTwoToneIcon from '@mui/icons-material/RiceBowlTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import WorkspacesTwoToneIcon from '@mui/icons-material/WorkspacesTwoTone';
import AdminRoute from '../../AdminRoute/AdminRoute';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddNewCycle from '../AddNewCycle/AddNewCycle';
import PaymentSharpIcon from '@mui/icons-material/PaymentSharp';
import Payment from '../Payment/Payment';

const drawerWidth = 240; 

const Dashboard = (props) => {

  let { path, url } = useRouteMatch();
  const [databaseUser, setDatabaseUser] = React.useState(null);
  const history = useHistory();
  const {user, logOut} = useAuth();
  React.useEffect(()=>{
    if(user){
      fetch(`https://boiling-island-95834.herokuapp.com/users/${user.email}`)
    .then(res => res.json())
    .then(data => setDatabaseUser(data))
    }
    },[user]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handelLink = (path) => {
    history.push(path);
  }



  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>

          {
            databaseUser ? <>  
          <ListItem  as={NavLink} to={`${url}/main`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <HomeIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Dashboard" className="dashboard-menu-list" />
          </ListItem>

          {
            databaseUser?.userRole?.toLowerCase() === "admin" ? <ListItem  as={NavLink} to={`${url}/manage-order`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <WorkspacesTwoToneIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Manage Order" className="dashboard-menu-list" />
          </ListItem> :
          <ListItem  as={NavLink} to={`${url}/my-order`} activeClassName='active-dashboard' >
          <ListItemIcon>
            <ShoppingBagTwoToneIcon className="dashboard-icon" />
          </ListItemIcon>
          <ListItemText sx={{fontWeight:"bold"}} primary="My Order" className="dashboard-menu-list" />
        </ListItem>
          }
          {
            databaseUser.userRole !== 'admin' && <ListItem  as={NavLink} to={`${url}/payment`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <PaymentSharpIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Payment" className="dashboard-menu-list" />
          </ListItem>
          }
          {
            databaseUser?.userRole === "admin" && <ListItem  as={NavLink} to={`${url}/make-admin`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <AdminPanelSettingsIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Make Admin" className="dashboard-menu-list" />
          </ListItem>
          }

          {
            databaseUser?.userRole ==="admin" && <ListItem  as={NavLink} to={`${url}/manage-products`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <RiceBowlTwoToneIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Manage Products" className="dashboard-menu-list" />
          </ListItem>
          }
          {
            databaseUser?.userRole === "admin" && <ListItem  as={NavLink} to={`${url}/add-new-bike`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <AddCircleIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Add a Cycle" className="dashboard-menu-list" />
          </ListItem>
          }

          <ListItem  as={NavLink} to={`${url}/reviews`} activeClassName='active-dashboard' >
            <ListItemIcon>
              <ReviewsIcon className="dashboard-icon" />
            </ListItemIcon>
            <ListItemText sx={{fontWeight:"bold"}} primary="Write Reviews" className="dashboard-menu-list" />
          </ListItem>
          </> :
          <Box sx={{ display: 'flex', justifyContent:"center", py:5 }}>
            <CircularProgress sx={{width:"20px"}} />
          </Box>
          }

      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow:1}}>
            <Box sx={{display:"flex", justifyContent:"flex-end"}}>
              <Button onClick={()=> handelLink("/home")} variant="initial">Home</Button>
              {
                user ? <Button onClick={()=> logOut("/")} variant="initial">Log Out</Button> :
                <Button onClick={()=> handelLink("/login")} variant="initial">LogIn</Button>
              }
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />


        <Switch>
          <Route exact path={`${path}`}>
            <DashboardHome />
          </Route>
          <Route exact path={`${path}/main`}>
            <DashboardHome />
          </Route>
          <Route path={`${path}/my-order`}>
            <MyOrder />
          </Route>
          <Route path={`${path}/payment`}>
            <Payment />
          </Route>
          <AdminRoute path={`${path}/manage-order`}>
            <ManageOrder />
          </AdminRoute>
          <AdminRoute path={`${path}/make-admin`}>
            <MakeAdmin />
          </AdminRoute>
          <Route path={`${path}/reviews`}>
            <ReviewsWrite />
          </Route>
          <AdminRoute path={`${path}/manage-products`}>
            <ManageProduct />
          </AdminRoute>
          <AdminRoute path={`${path}/add-new-bike`}>
            <AddNewCycle />
          </AdminRoute>
      </Switch>

      </Box>
    </Box>

    </>
  ); 

}



export default Dashboard;