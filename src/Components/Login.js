import React from 'react';
import { useState } from 'react';
import { useStateValue } from '../store/StateProvider';
// import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import GitHubIcon from '@material-ui/icons/GitHub';





const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const axios = require('axios');
    // eslint-disable-next-line 
    const [state, dispatch] = useStateValue();
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    const [btnload, setBtnload] = useState(false)
    const { client_id, redirect_uri } = state;




    const Sendlogin = (e) => {
        e.preventDefault();
        setBtnload(true)
        setData({ ...data, errorMessage: "" })

        axios({
            method: 'post',
            url: 'https://commitspy.herokuapp.com/api/users/login',
            data: {
                user: {
                    email: email,
                    password: pass,
                }
            }
        })
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: "LOGIN",
                    payload: { token: response.data.user.token, isLoggedIn: true }
                });
                setBtnload(false)

            })
            .catch(function (error) {
                console.log(error);
                setData({
                    isLoading: false,
                    errorMessage: "Sorry! Login failed"
                });
            });


    }
    const newlogin = () => {
        console.log('click');



        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        const axios = require('axios');



        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, null, newUrl[0]);
            setData({ ...data, isLoading: true });


            // fetch user details with token
            axios.post(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`, {
                client_id: state.client_id,
                redirect_uri: state.redirect_uri,
                client_secret: state.client_secret,
                code: newUrl[1]
            })
                .then(response => {
                    console.log(response.data)
                    console.log(newUrl)

                    let params = new URLSearchParams(response.data);

                    setBtnload(true)
                    axios.post('https://commitspy.herokuapp.com/api/users/regtoken',

                        {

                            // email: useremail,
                            access_token: params.get("access_token"),
                            // password: userpass,
                            scope: params.get("scope"),
                            token_type: params.get("token_type"),

                        }
                    )
                        .then(function (response) {
                            console.log(response);
                            dispatch({
                                type: "LOGIN",
                                payload: { token: response.data.user.token, isLoggedIn: true }
                            });
                            setBtnload(false)

                        })
                        .catch(function (error) {
                            console.log(error);
                            setData({
                                isLoading: false,
                                errorMessage: "Sorry! Login failed"
                            });
                        });


                })

                .catch(error => {
                    console.log(error);
                });

        }
    }


    // if (state.isLoggedIn) {
    //     return <Redirect to="/home" />;
    // }


    return (
        <div className='login'>

            <div className="grid__container">
                <div className="form__container">
                    <p>{data.errorMessage}</p>

                    <h2>Sign In</h2>

                    <div className="intro">
                        A few more clicks to sign in to your account.
                        Manage all your projects in one place
                    </div>
                    <form className='login__form'>
                        <input type="email" placeholder='enter email' value={email} onChange={e => setEmail(e.target.value)} />
                        <input className='pinput' type="password" placeholder='password' value={pass} onChange={e => setPass(e.target.value)} />
                        <div className="form__btn">

                            <button className='login_btn' onClick={Sendlogin}>Login {btnload && <CircularProgress />}</button>
                            <Link to='/register' className='signup_btn' >Sign up</Link>
                        </div>
                    </form>
                    < Link to='/forgetpass' className="forget">
                        forget password?
                    </Link >

                    <button onClick={() => {

                        window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;
                        newlogin()
                        setData({ ...data, errorMessage: "" });
                    }}>
                        <GitHubIcon />

                    </button>



                    <div className="footer">
                        By signing up, you agree to our
                        <br />
                        <span>Terms and Conditions</span> & <span >Privacy Policy</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;