import React from 'react';
import { useState } from 'react';


const ForgetPass = () => {
    const axios = require('axios');
    const [success, setSuccess] = useState(false)


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
                setSuccess(true)



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
            <div className={success ? 'showconfirmEmail fade-in' : ' signup_confirmEmail '}>
                <h3>Check your Email to rest your password</h3>
            </div>
        </div>

    );
};

export default ForgetPass;