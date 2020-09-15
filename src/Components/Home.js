import React from 'react';
import { useStateValue } from '../store/StateProvider';
import { useEffect } from 'react';
// import { SearchOutlined } from '@material-ui/icons';
import ProjectCard from './ProjectCard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Media from 'react-media';
import CreateBtn from './CreateBtn';
import Chooseproj from './Chooseproj';
import { useState } from 'react';
import { useHistory } from 'react-router'



const Home = () => {
    console.log('againnnnnnn');
    // eslint-disable-next-line
    const [{ token }, dispatch] = useStateValue();
    const [me, setMe] = useState({});
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    // console.log(token);
    let tee = (res) => {
        let project = res.data.project;
        console.log("project => ", project)
        setProjects([...projects, project])


    }

    useEffect(() => {
        const axios = require('axios');


        if (token) {
            axios.all([
                axios.get(`https://commitspy.herokuapp.com/api/users/me`, {
                    headers: { 'authorization': `Bearer ${token}` }
                }),
                axios.get(`https://commitspy.herokuapp.com/api/project/userprojects`, {
                    headers: { 'authorization': `Bearer ${token}` }
                })
            ]).then(axios.spread((data1, data2) => {
                // output of req.
                console.log('data1', data1, 'data2', data2)
                setMe(data1.data)
                setProjects(data2.data.project)
                console.log(data2.data.project);
                setLoading(true)
            }));
        }


    }, [])



    if (loading) {

        return (
            <div className='home'>
                <Media query="(max-width: 1024px)">
                    {matches =>
                        matches ? (


                            <Router>
                                <CreateBtn />


                                <div className="home_grid">

                                    <Switch>
                                        <Route exact path='/home'>
                                            <div className="info">
                                                <h1 className='name'>{`Hi ${me.user.username}`}</h1>
                                                <p className='greetings'>Welcome back to workspace, we missed you</p>

                                                <div className="info__projects">
                                                    <h3>Projects <span>({projects.length})</span></h3>
                                                    <div className="proj_grid">
                                                        {projects.map(project => (

                                                            <ProjectCard key={project.git_id} />

                                                        ))}



                                                    </div>

                                                </div>
                                            </div>
                                        </Route>
                                        <Route path='/home/repos' >
                                            <Chooseproj onTee={tee} />
                                        </Route>
                                        <Route path='/home/project'>
                                            <div className="showmain">

                                            </div>
                                        </Route>

                                    </Switch>

                                </div>
                            </Router>
                        ) : (
                                <Router>
                                    <CreateBtn />


                                    <div className="home_grid">
                                        <div className="info">
                                            <h1 className='name'>{`Hi ${me.user.username}`}</h1>
                                            <p className='greetings'>Welcome back to workspace, we missed you</p>

                                            <div className="info__projects">
                                                <h3>Projects <span>({projects.length})</span></h3>
                                                <div className="proj_grid">
                                                    {projects.map(project => (

                                                        <ProjectCard key={project.git_id} id={project.git_id} />

                                                    ))}

                                                </div>

                                            </div>
                                        </div>
                                        <Switch>
                                            <Route path='/home/repos' >
                                                <Chooseproj onTee={tee} />

                                            </Route>

                                            <Route path='/home/project'>
                                                <div className="showmain">

                                                </div>
                                            </Route>

                                        </Switch>

                                    </div>
                                </Router>
                            )
                    }
                </Media>

            </div>
        );
    } else {
        return (
            <div className="home">
                <h1>Loading</h1>
            </div>
        )
    }

};

export default Home;