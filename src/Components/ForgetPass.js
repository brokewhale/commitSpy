import React from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';


const ForgetPass = () => {
    const axios = require('axios');
    const [open, setOpen] = useState(false);

    const [email, setEmail] = useState('')
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
                setOpen(o => !o)


            })
            .catch(function (error) {
                console.log(error);

            });
    }


    return (
        <div className='forgetpass'>
            <form className="container">

                <input type="email" placeholder='enter email' value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={sendmail}>Submit</button>
            </form>
            <Popup open={open} closeOnDocumentClick  >
                <div className='edit_pop'>
                    <h1>Check your email to confirmm</h1>
                </div>

            </Popup>
        </div>

    );
};

export default ForgetPass;