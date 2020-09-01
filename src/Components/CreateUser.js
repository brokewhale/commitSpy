import React, { useState, useEffect } from "react";
import { useStateValue } from '../store/StateProvider';

const CreateUser = () => {
    const [state, dispatch] = useStateValue();
    const [data, setData] = useState({ errorMessage: "", isLoading: false });
    const [access_token, setAccess_token] = useState('')
    const [scope, setScope] = useState('')
    const [token_type, setTokentype] = useState('')



    const { client_id, redirect_uri } = state;
    // eslint-disable-next-line 
    const [getUserpass, setGetUserpass] = useState(false);
    const [userpass, setUserpass] = useState('');


    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        const axios = require('axios');
        // const Sendpass =()=>{

        // }


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
                    // console.log(response.data)

                    let params = new URLSearchParams(response.data);
                    setAccess_token(params.get("access_token"));
                    setScope(params.get("scope"));
                    setTokentype(params.get("token_type"))

                    setGetUserpass(true)

                })

                .catch(error => {
                    console.log(error);
                });

        }

        // const axios = require('axios');
    }, [state, dispatch, data,]);

    const Sendpass = (e) => {
        const axios = require('axios');
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://commitspy.herokuapp.com/api/users/register',
            data: {
                user: {
                    access_token: access_token,
                    password: userpass,
                    scope: scope,
                    token_type: token_type,
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


    if (getUserpass) {

        return (
            <div className="getpass">
                <input type="password" placeholder='enter your password' value={userpass} onChange={e => setUserpass(e.target.value)} />
                <button onClick={Sendpass}>Register</button>
                <h1>{scope}</h1>
                <h1>{access_token}</h1>
                <h1>{token_type}</h1>
            </div>

        )


    } else {
        return (
            <div className='createuser'>
                <a
                    href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                    onClick={() => {
                        setData({ ...data, errorMessage: "" });
                    }}
                >
                    <span>Login with GitHub</span>
                </a>
            </div>
        )
    }


    // return (
    //     <div className='createuser'>
    //         <a
    //             href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
    //             onClick={() => {
    //                 setData({ ...data, errorMessage: "" });
    //             }}
    //         >
    //             <span>Login with GitHub</span>
    //         </a>




    //         {{
    //             if(getUserpass) {
    //                 () => (
    //                     <div className="getpass">
    //                         <input type="password" placeholder='enter your password' value={userpass} onChange={e => setUserpass(e.target.value)} />
    //                         <button onClick={Sendpass}>Register</button>
    //                     </div>)
    //             }

    //         }}
    //     </div>
    // );
};

export default CreateUser;