import React from 'react';
import { useStateValue } from '../store/StateProvider';
import { useEffect } from 'react';
// import { SearchOutlined } from '@material-ui/icons';
import ProjectCard from './ProjectCard';

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
        <div className='home'>
            <div className="home_grid">
                <div className="info">
                    <h1 className='name'>Hi User</h1>
                    <p className='greetings'>Welcome back to workspace, we missed you</p>

                    <div className="info__projects">
                        <h3>Projects <span>(13)</span></h3>
                        <div className="proj_grid">

                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />

                        </div>

                    </div>
                </div>
                <div className="showmain">

                </div>
            </div>

        </div>
    );
};

export default Home;