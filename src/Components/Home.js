import React from 'react';
import { useStateValue } from '../store/StateProvider';

const Home = () => {
    // eslint-disable-next-line
    const [{ myuser }, dispatch] = useStateValue();
    return (
        <div>
            <h1>Home page testing context</h1>
            <h1>{myuser?.name}</h1>
            <img src={myuser?.avatar_url} alt="Avatar" />
            <div>{myuser?.public_repos} Repos</div>
            <div>{myuser?.followers} Followers</div>
            <div>{myuser?.following} Following</div>
        </div>
    );
};

export default Home;