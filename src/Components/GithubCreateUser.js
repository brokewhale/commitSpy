import React from 'react';
import GitHubLogin from 'react-github-login';
import { useState } from 'react';


const GithubCreateUser = () => {
    require('dotenv').config()
    const [code, Setcode] = useState('')

    // console.log(process.env.REACT_APP_CLIENT_ID);



    const onSuccessGithub = (response) => {
        console.log(response.code);
        Setcode(response.code)
    }
    return (
        <div>
            <h1>LOGIN WITH GITHUB</h1>

            {/*CLIENTID REDIRECTURI NOT CREATED YET*/}

            <GitHubLogin clientId={process.env.REACT_APP_CLIENT_ID}
                onSuccess={onSuccessGithub}
                buttonText="LOGIN WITH GITHUB"
                className="git-login"
                valid={true}
                redirectUri={process.env.REACT_APP_REDIRECT_URI}
            />
        </div>
    );
};

export default GithubCreateUser;