import React from 'react';
import './Styles/style.css';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import Home from './Components/Home';
import Wellcome from './Components/Wellcome'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GithubCreateUser from './Components/GithubCreateUser';
import LoginWithGithub from './Components/LoginWithGithub';


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Wellcome} />


          <Route path='/login'>
            {/* <GithubCreateUser /> */}
            <CreateUser />
            {/* <LoginWithGithub /> */}

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
