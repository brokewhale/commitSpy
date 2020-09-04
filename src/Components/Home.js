import React from 'react';
import { useStateValue } from '../store/StateProvider';

const Home = () => {
    // eslint-disable-next-line
    const [{ myuser }, dispatch] = useStateValue();
    return (
        <div>
            <h1>Home page testing context</h1>
            <h1>{myuser?.username} name</h1>
            <img src={myuser?.avatar} alt="Avatar" />
            <div>{myuser?.email} Repos</div>
            <div>{myuser?.twitter} twitter</div>
        </div>
    );
};

export default Home;