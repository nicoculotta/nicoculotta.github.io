import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Main from './components/Main'
import About from './components/About'

function App() {
  return (
    <Router>
      <>
      <div className="nav">
        <div className="nav-logos">
          <img className="logo-open" src="./images/logo_open.png" alt="Logo Open Weather"/>
          <div className="logo">
            <NavLink to="/">Air pollution data</NavLink>
          </div>
        </div>
        <NavLink to="/about">About Project</NavLink>
      </div>

      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
      </>
    </Router>
  );
}

export default App;
