import React from 'react';
import { useStateValue } from '../store/StateProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import ListRepos from './ListRepos';
import Loader from 'react-loader-spinner'



const Chooseproj = ({ onTee }) => {
    const [{ token },] = useStateValue();
    const [isloading, setIsloading] = useState(false);
    const [nonredux, SetNonredux] = useState([]);
    useEffect(() => {
        const axios = require('axios');
        axios.get(`https://commitspy.herokuapp.com/api/users/repos`, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then((resp) => {
            console.log(resp.data);
            SetNonredux(resp.data)
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
            <div className='chooseproj loading'>
                <Loader type="Rings" color="#354376" height={130} width={130} />
            </div>
        );
    }
};

export default Chooseproj;