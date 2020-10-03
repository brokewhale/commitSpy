import React from 'react';
import { useState } from 'react';
// import { Redirect } from "react-router-dom";

const ForgetPass = () => {
    const axios = require('axios');

    const [email, setEmail] = useState('')
    // const [done, setDone] = useState(false)
    const sendmail = (e) => {
        console.log(email);
        e.preventDefault()


        axios({
            method: 'post',
            url: 'https://commitspy.herokuapp.com/api/users/forgetpassword',
            data: {
                email: email,
            }
        })
            .then(function (response) {
                console.log(response);
                // setDone(true)

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    // if (done) {
    //     return (

    //         <Redirect to='/verifypass' />
    //     )
    // }
    return (
        <div className='forgetpass'>
            <form className="container">

                <input type="email" placeholder='enter email' value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={sendmail}>Submit</button>
            </form>
        </div>

    );
};

export default ForgetPass;