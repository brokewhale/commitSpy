import React from 'react';
import { useStateValue } from '../store/StateProvider';
import { useEffect } from 'react';

const Home = () => {
    // eslint-disable-next-line
    const [{ token }, dispatch] = useStateValue();
    console.log(token);

    useEffect(() => {
        const axios = require('axios');

        if (token) {
            axios.get(`https://cors-anywhere.herokuapp.com/https://commitspy.herokuapp.com/api/users/me`, {
                headers: { 'authorization': `Bearer ${token}` }
            }).then((resp) => {
                console.log(resp);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [token, dispatch])

    return (
        <div>

        </div>
    );
};

export default Home;