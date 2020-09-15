import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";



// import Popup from 'reactjs-popup';
import { Redirect } from "react-router-dom";


const ListRepos = ({ reponame, id, fullname, token, onTee }) => {
    const appHistory = createBrowserHistory();


    const [done, setDone] = useState(false)


    const testid = () => {
        let project = {
            git_id: String(id),
            title: fullname,
        }
        const axios = require('axios');
        axios.post(`https://commitspy.herokuapp.com/api/project/`, { project }, {
            headers: { 'authorization': `Bearer ${token}` },

        }).then(function (response) {
            console.log(response);
            onTee(response)

            setDone(true)


        }).catch(function (error) {
            console.log(error);
        });
    }





    if (done) {
        // appHistory.push('/home');
        // appHistory.goBack();

        return <Redirect to="/home" />;
    }
    return (
        <div onClick={testid} className='listrepos'>
            <h1>{reponame}</h1>

        </div>
    );
};

export default ListRepos;