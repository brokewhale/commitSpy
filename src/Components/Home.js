import React from 'react';
import { useStateValue } from '../store/StateProvider';
import { useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Media from 'react-media';
import CreateBtn from './CreateBtn';
import Chooseproj from './Chooseproj';
import { useState } from 'react';
import ProjectInfo from './ProjectInfo';
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import User from './User';
import { Redirect } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';





const Home = () => {
    console.log('againnnnnnn');
    // eslint-disable-next-line
    const [{ token }, dispatch] = useStateValue();
    const [me, setMe] = useState({});
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notoken, setNontoken] = useState(false)



    // console.log(token);
    let tee = (res) => {
        let project = res.data.project;
        console.log("project => ", project)
        setProjects([...projects, project])


    }
    let ken = (res) => {

        let project = res.data;
        let temp = projects


        let ind = temp.findIndex(x => x._id === project._id)
        temp.splice(ind, 1)
        setProjects([])
        setProjects(temp)

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
        } else {
            setNontoken(true)

        }


    },
        // eslint-disable-next-line
        [])

    if (notoken) {
        return <Redirect to="/signin" />;
    }



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
                                                <div className="info-top">
                                                    <h1 className='name'>{`Hi ${me.user.username}`}</h1>
                                                    <Link to='/home/user'> <AccountCircleIcon /></Link>

                                                </div>
                                                <p className='greetings'>Welcome back to workspace, we missed you</p>

                                                <div className="info__projects">
                                                    <h3>Projects <span>({projects.length})</span></h3>
                                                    <div className="proj_grid">
                                                        <h2 className={projects.length <= 0 ? 'show' : 'tweet'}>You have no project added</h2>
                                                        {projects.map(project => (

                                                            <ProjectCard key={project.git_id} id={project.git_id} name={project.title} id2={project._id} />

                                                        ))}



                                                    </div>

                                                </div>
                                            </div>
                                        </Route>
                                        <Route path='/home/repos' >
                                            <Chooseproj onTee={tee} />
                                        </Route>
                                        <Route path='/home/project/:roomId'>
                                            <div className="showmain">
                                                <ProjectInfo projects={projects} token={token} location='first' onKen={ken} />

                                            </div>
                                        </Route>
                                        <Route path='/home/user' >
                                            <div className="showmain">
                                                <User token={token} name={me.user.username} img={me.user.avatar} email={me.user.email} projects={projects.length} wallet={me.user.wallet} proj={projects} />

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
                                            <div className="info-top">
                                                <h1 className='name'>{`Hi ${me.user.username}`}</h1>
                                                <Link to='/home/user'> <AccountCircleIcon /></Link>


                                            </div>
                                            <p className='greetings'>Welcome back to workspace, we missed you</p>

                                            <div className="info__projects">
                                                <h3>Projects <span>({projects.length})</span></h3>
                                                <div className="proj_grid">
                                                    {projects.map(project => (

                                                        <ProjectCard key={project.git_id} id={project.git_id} name={project.title} id2={project._id} />

                                                    ))}

                                                </div>

                                            </div>
                                        </div>
                                        <Switch>
                                            <Route path='/home/repos' >
                                                <Chooseproj onTee={tee} />

                                            </Route>

                                            <Route path='/home/project/:roomId'>
                                                <div className="showmain">
                                                    <ProjectInfo projects={projects} token={token} location='locate second' onKen={ken} />

                                                </div>
                                            </Route>
                                            <Route path='/home/user' >
                                                <div className="showmain">
                                                    <User token={token} name={me.user.username} img={me.user.avatar} email={me.user.email} projects={projects.length} wallet={me.user.wallet} proj={projects} />

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
            <div className="home-loading">
                <Loader
                    type="Puff"
                    color="cornflowerblue"
                    height={100}
                    width={100}
                // timeout={3000} //3 secs

                />
            </div>
        )
    }

};

export default Home;