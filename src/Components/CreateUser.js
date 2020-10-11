import React, { useState, useEffect } from "react";
import { useStateValue } from '../store/StateProvider';
import CircularProgress from '@material-ui/core/CircularProgress';



const CreateUser = () => {
    const [state, dispatch] = useStateValue();
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    const [access_token, setAccess_token] = useState('')
    const [scope, setScope] = useState('')
    const [token_type, setTokentype] = useState('')
    const [btnload, setBtnload] = useState(false)




    const { client_id, redirect_uri } = state;
    // eslint-disable-next-line 
    const [getUserpass, setGetUserpass] = useState(false);
    const [userpass, setUserpass] = useState('');
    const [useremail, setUseremail] = useState('');



    useEffect(() => {
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
                    setAccess_token(params.get("access_token"));
                    setScope(params.get("scope"));
                    setTokentype(params.get("token_type"))

                    // setGetUserpass(true)
                    Sendpass()

                })

                .catch(error => {
                    console.log(error);
                });

        }

        // const axios = require('axios');
    },
        // eslint-disable-next-line 
        [state, dispatch, data,]);

    const Sendpass = (e) => {
        console.log('sendpass');
        const axios = require('axios');
        setBtnload(true)
        e.preventDefault();
        axios.post('https://commitspy.herokuapp.com/api/users/regtoken',

            {

                // email: useremail,
                access_token: access_token,
                // password: userpass,
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
    if (state.isLoggedIn) {
        window.location.href = `https://github.com/apps/committ-app`;

    }

    if (getUserpass) {

        return (
            <div className="getpass">
                <div className="getpass_container">

                    <input type="email" placeholder='enter your email' value={useremail} onChange={e => setUseremail(e.target.value)} />
                    <input type="password" placeholder='enter your password' value={userpass} onChange={e => setUserpass(e.target.value)} />
                    <button onClick={Sendpass}>Register {btnload && <CircularProgress />}</button>
                </div>

            </div>

        )


    } else {
        return (
            <div className='createuser'>
                <button onClick={() => {
                    setBtnload(true)
                    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;
                    setData({ ...data, errorMessage: "" });
                }}> {!btnload && <span> Register with github</span>} {btnload && <CircularProgress />}</button>

            </div>
        )
    }



};

export default CreateUser;