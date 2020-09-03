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

            <div className="grid__container">
                <div className="form__container">

                    <h2>Sign In</h2>

                    <div className="intro">
                        A few more clicks to sign in to your account.
                        Manage all your projects in one place
                    </div>
                    <form className='login__form'>
                        <input type="email" placeholder='enter email' value={email} onChange={e => setEmail(e.target.value)} />
                        <input className='pinput' type="password" placeholder='password' value={pass} onChange={e => setPass(e.target.value)} />
                        <div className="form__btn">

                            <button className='login_btn' onClick={Sendlogin}>Login</button>
                            <button className='signup_btn' >Sign up</button>
                        </div>
                    </form>


                    <div className="footer">
                        By signing up, you agree to our
                        <br />
                        <span>Terms and Conditions</span> & <span>Privacy Policy</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;