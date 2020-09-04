import React from 'react';
import './Styles/style.css';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import Home from './Components/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>

          <Route path='/login'>
            <CreateUser />

          </Route>

          <Route path='/enter'>
            <Login />

          </Route>
          <Route path="/home" component={Home} />

        </Switch>
      </Router>

      {/* <CreateUser /> */}


    </div>
  );
}

export default App;
