import React from 'react';
import { useEffect, useState } from 'react';
// localhost:3000/verifypass/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNTE5N2QxYTIzODE2MDAwZmYwNjJlYSIsInVzZXJuYW1lIjoiQ29kaW5nTWFnZSIsImV4cCI6MTYwMTc0MjUxNywiaWF0IjoxNjAxNzQwNzE3fQ.woeB_0Ez4Pi3OK3qUlv-Z7FhJRPfMpS2BjsrjwRRapI

const VerifyPass = () => {
    const [done, setDone] = useState(false)
    const [pass, setPass] = useState('');
    const [token, setToken] = useState('');



    useEffect(() => {
        const url = window.location.href;
        console.log(url);
        const hasCode = url.includes("?token=");
        const axios = require('axios');

        if (hasCode) {
            const newUrl = url.split("?token=");
            window.history.pushState({}, null, newUrl[0]);
            setToken(newUrl[1])
            axios({
                method: 'post',
                url: 'https://commitspy.herokuapp.com/api/users/verify',
                data: {
                    token: newUrl[1]
                }
            })
                .then(function (response) {
                    console.log(response);
                    setDone(response.data.status)

                })
                .catch(function (error) {
                    console.log(error);

                });
        }



    }, [])

    const resetpass = (e) => {
        const axios = require('axios');
        e.preventDefault()

        axios({
            method: 'post',
            url: 'https://commitspy.herokuapp.com/api/users/resetpassword',
            data: {
                token: token,
                password: pass
            }
        })
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);

            });
    }

    if (done) {

        return (
            <div className="forgetpass">


                <form className="container">

                    <input className='pinput' type="password" placeholder='Enter your new password' value={pass} onChange={e => setPass(e.target.value)} />
                    <button onClick={resetpass}>Reset Passwprd</button>
                </form>
            </div>


        );
    } else {
        return (
            <h1>loading</h1>
        )
    }

};

export default VerifyPass;