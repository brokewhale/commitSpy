import React from 'react';
import { useStateValue } from '../store/StateProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import ListRepos from './ListRepos';


const Chooseproj = ({ onTee }) => {
    const [{ token }, dispatch] = useStateValue();
    const [isloading, setIsloading] = useState(false);
    const [nonredux, SetNonredux] = useState([]);
    const [repos, setRepos] = useState([])
    useEffect(() => {
        const axios = require('axios');
        axios.get(`https://commitspy.herokuapp.com/api/users/repos`, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then((resp) => {
            console.log(resp.data);
            SetNonredux(resp.data)
            // dispatch({
            //     type: "GETREPO",
            //     payload: { repos: resp.data, }
            // });
            setRepos(resp.data)
            // console.log(repos[4].name);
            setIsloading(true)


        }).catch(err => {
            console.log(err);
        })

    },
        // eslint-disable-next-line
        [])


    if (isloading) {

        return (
            <div className='chooseproj'>



                {nonredux.map(repo => (
                    <ListRepos key={repo.id} id={repo.id}
                        reponame={repo.name}
                        fullname={repo.full_name}
                        token={token}
                        onTee={onTee}
                    />

                ))}

            </div>
        );
    } else {

        return (
            <div className='chooseproj'>
                <h1>Loading....</h1>
            </div>
        );
    }
};

export default Chooseproj;