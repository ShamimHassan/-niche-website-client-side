import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import firebaseInit from './firebase/firebase-init/firebase.init';
import Home from './pages/Home/Home/Home';
import NotFound from './pages/Common/NotFound/NotFound';
import Login from './pages/Authorize/Login/Login';
import Register from './pages/Authorize/Register/Register';
import Detail from './pages/Detail/Detail';
import ExploreBikes from './pages/ExploreBikes/ExploreBikes';
import AuthProvider from './contex/AuthProvider/AuthProvider';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Profile from './pages/Profile/Profile';
import BuyNow from './pages/BuyNow/BuyNow';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import MyOrder from './pages/Dashboard/MyOrder/MyOrder';
import Shop from './pages/Shop/Shop';

firebaseInit();

function App() {
  return (
    <>
    <AuthProvider>
    <Router>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/explore">
          <ExploreBikes />
        </Route>
        <PrivateRoute path="/details/:id">
          <Detail />
        </PrivateRoute>
        <PrivateRoute path="/buy/:id">
          <BuyNow />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>        
        <PrivateRoute path="/my-order">
          <MyOrder />
        </PrivateRoute>        
        <Route exact path="/by-cycles">
          <Shop />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
      </Router>

    </AuthProvider>
      
    </>
  );
}

export default App;
