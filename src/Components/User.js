import React from 'react';
import { Avatar } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';



const User = ({ name, img, email, projects }) => {

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
        <div className='chooseproj '>
            <div className="user">
                <Avatar className='logo' alt="name" src={img} />
                <h1>{name}</h1>
                <p>{email}</p>

                <div className="userparams">
                    <div className="noofproj card">
                        <p>{projects}</p>
                        <h3>projects</h3>
                    </div>
                    <div className="divide"></div>
                    <div className="amounti card">
                        <p>#200</p>
                        <h3>wallet</h3>
                    </div>
                </div>
                <div className="addmoney">
                    <h3>Add money</h3>
                    <PaymentIcon />
                </div>

            </div>
        </div>
    );
};

export default User;