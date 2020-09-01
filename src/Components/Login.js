import React from 'react';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const axios = require('axios');


    const Sendlogin = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://commitspy.herokuapp.com/api/users/login',
            data: {
                user: {
                    email: email,
                    password: pass,
                }
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div className='login'>
            <form >
                <input type="email" placeholder='enter email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='password' value={pass} onChange={e => setPass(e.target.value)} />
                <button onClick={Sendlogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;