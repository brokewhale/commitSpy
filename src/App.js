import React from 'react';
import './Styles/style.css';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import GithubCreateUser from './Components/GithubCreateUser';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Login />
      <CreateUser />
      <GithubCreateUser />
      <Home />
    </div>
  );
}

export default App;
