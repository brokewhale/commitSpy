import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';


const User = ({ name, img }) => {

    // useEffect(() => {
    //     const axios = require('axios');


    //     axios.get(`https://commitspy.herokuapp.com/api/users/me`, {
    //         headers: { 'authorization': `Bearer ${token}` }
    //     }).then(function (response) {
    //         console.log(response);
    //         setMe(response.data)

    //     }).catch(err => {
    //         console.log(err);
    //     })


    // },
    //     // eslint-disable-next-line  
    //     [])
    return (
        <div className='chooseproj'>
            <Avatar className='logo' alt="name" src={img} />
            <h1>{name}</h1>
        </div>
    );
};

export default User;