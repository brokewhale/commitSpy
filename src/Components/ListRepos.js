import React from 'react';
import { useState } from 'react';
// import Popup from 'reactjs-popup';
import { Redirect } from "react-router-dom";


const ListRepos = ({ reponame, id, fullname, token }) => {
    const [done, setDone] = useState(false)


    const testid = () => {
        let project = {
            git_id: String(id),
            title: fullname,
        }
        const axios = require('axios');
        axios.post(`https://cors-anywhere.herokuapp.com/https://commitspy.herokuapp.com/api/project/`, { project }, {
            headers: { 'authorization': `Bearer ${token}` },

        }).then(function (response) {
            console.log(response);
            setDone(true)

        }).catch(function (error) {
            console.log(error);
        });
    }





    if (done) {
        return <Redirect to="/home" />;
    }
    return (
        <div onClick={testid} className='listrepos'>
            <h1>{reponame}</h1>

        </div>
    );
};

export default ListRepos;