import React, { useState } from "react";
import './style.css';
import ProductPost from './ProductPost';
import Shoes from './Shoes';
import HandBag from './HandBag';
import Shirt from './Shirt';
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch
} from "react-router-dom";

export default function OnLineShop(){
  const[isAuthenticated,setIsAuthenticated] = useState();

  const fakeAuth = {
    isAuthenticated: isAuthenticated,
    authenticate(cb){
      fakeAuth.isAuthenticated = true;
      setIsAuthenticated(true)
      setTimeout(cb, 100);
    },
    signout(cb){
      setIsAuthenticated(false);
      fakeAuth.isAuthenticated = false;
      setTimeout(cb,100);
    }
  };

  return(
    <Router>
      <div>
        <AuthButton fakeAuth={fakeAuth} isAuthenticated={isAuthenticated} />

        <ul className="header">
          <li>
            <image src="logo.png" />
          </li>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/private">Category</Link>
          </li>
        </ul>

        <div className="content">
        <Switch>
          <Route path="/Home">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage fakeAuth={fakeAuth} />
          </Route>
          <PrivateRoute path="/private" fakeAuth={fakeAuth}>
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
        </div>
      </div>
    </Router>
  );
}



function AuthButton(props){
  const{fakeAuth} = props;
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      welcome!{" "}
      <button 
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({ children, ...rest }){
  const{fakeAuth} = rest;
  return(
    <Route 
      {...rest}
      render={({ location }) =>
      fakeAuth.isAuthenticated ? (
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
}

function HomePage(){
  return(
    <ProductPost />
  );
}

function LoginPage(props){
  const{fakeAuth} = props

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

function ProtectedPage(){
  let {path, url} = useRouteMatch();

  return (
    <div className="display">
      <div>
      {/* <h4>Product category</h4> */}
      <ul className="nav">
        <li>
          <Link to={`${url}/shoes`} className="link">Shoes</Link>
        </li>
        <li>
          <Link to={`${url}/shirt`} className="link">Shirt</Link>
        </li>
        <li>
          <Link to={`${url}/handBag`} className="link">Hand Bag</Link>
        </li>
      </ul>
      </div>
      <hr />
      <Switch>
        <Route exact path="/private">
          <h3>Please Select one category</h3>
        </Route>
        <Route path={`${path}/shoes`}>
          <Shoes />
        </Route>
        <Route path={`${path}/shirt`}>
          <Shirt />
        </Route>
        <Route path={`${path}/handBag`}>
          <HandBag />
        </Route>
      </Switch>
    </div>
  );
}

