import React, { useState, useEffect } from "react";
import { useStateValue } from '../store/StateProvider';
import { Redirect } from "react-router-dom";
import GitHubLogin from 'react-github-login';



const LoginWithGithub = () => {
    const [state, dispatch] = useStateValue();
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    const [access_token, setAccess_token] = useState('')
    const [scope, setScope] = useState('')
    const [token_type, setTokentype] = useState('')
    require('dotenv').config()
    const [code, setCode] = useState('')
    const [gotcode, setGotcode] = useState(false)



    const { client_id, redirect_uri } = state;
    // eslint-disable-next-line 
    const [getUserpass, setGetUserpass] = useState(false);
    const [userpass, setUserpass] = useState('');
    const [useremail, setUseremail] = useState('');

    const onSuccessGithub = (response) => {
        console.log(response.code);
        setCode(response.code)
        // setData({ ...data, errorMessage: "" });
        // setGotcode(true)





        // After requesting Github access, Github redirects back to your app with a code parameter
        const axios = require('axios');
        // const Sendpass =()=>{

        // }


        // If Github API returns the code parameter



        setData({ ...data, isLoading: true });


        // fetch user details with token
        axios.post(`https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token`, {
            client_id: state.client_id,
            redirect_uri: state.redirect_uri,
            client_secret: state.client_secret,
            code: code
        })
            .then(response => {
                console.log(response)
                // console.log(newUrl)

                let params = new URLSearchParams(response.data);
                setAccess_token(params.get("access_token"));
                setScope(params.get("scope"));
                setTokentype(params.get("token_type"))

                setGetUserpass(true)

            })

            .catch(error => {
                console.log(error);
            });



        // const axios = require('axios');
    }

    const Sendpass = (e) => {
        const axios = require('axios');
        e.preventDefault();
        axios.post('https://commitspy.herokuapp.com/api/users/regtoken',

            {

                email: useremail,
                access_token: access_token,
                password: userpass,
                scope: scope,
                token_type: token_type,

            }
        )
            .then(function (response) {
                console.log(response);
                dispatch({
                    type: "LOGIN",
                    payload: { token: response.data.user.token, isLoggedIn: true }
                });
            })
            .catch(function (error) {
                console.log(error);
                setData({
                    isLoading: false,
                    errorMessage: "Sorry! Login failed"
                });
            });
    }
    if (state.isLoggedIn) {
        return <Redirect to="/home" />;
    }

    if (getUserpass) {

        return (
            <div className="getpass">
                <div className="getpass_container">

                    <input type="email" placeholder='enter your email' value={useremail} onChange={e => setUseremail(e.target.value)} />
                    <input type="password" placeholder='enter your password' value={userpass} onChange={e => setUserpass(e.target.value)} />
                    <button onClick={Sendpass}>Register</button>
                </div>

            </div>

        )


    } else {
        return (
            <div className='createuser'>
                <GitHubLogin clientId={process.env.REACT_APP_CLIENT_ID}
                    onSuccess={onSuccessGithub}
                    buttonText="LOGIN WITH GITHUB"
                    className="git-login"
                    valid={true}
                    redirectUri={process.env.REACT_APP_REDIRECT_URI}
                />
            </div>
        )
    }



};

export default LoginWithGithub;