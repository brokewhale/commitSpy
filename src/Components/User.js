import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';


const User = ({ name, img, email }) => {

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
        <div className='chooseproj user'>
            <Avatar className='logo' alt="name" src={img} />
            <h1>{name}</h1>
            <p>{email}</p>
        </div>
    );
};

export default User;