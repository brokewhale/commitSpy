import React from 'react';
import { useParams } from 'react-router-dom';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';



const ProjectInfo = ({ projects, onKen, token, location }) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [done, setDone] = useState(false)
    const [done2, setDone2] = useState(false)

    const [proj, setProj] = useState({})
    const { roomId } = useParams();
    useEffect(() => {
        const axios = require('axios');

        axios.get(`https://commitspy.herokuapp.com/api/project/projects/${roomId}`, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then(function (response) {
            // console.log(response);
            setProj(response.data)
            setDone(true)




        }).catch(err => {
            console.log(err);
        })


    }, [])
    let date = new Date(proj.trigger);
    let deadline = date.toDateString()

    const deleteProject = () => {

        const axios = require('axios');
        axios.delete(`https://commitspy.herokuapp.com/api/project/projects/${proj._id}`, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then(function (response) {
            console.log(response);
            onKen(response)
            setDone2(true)


        }).catch(err => {
            console.log(err);
        })
        console.log('clicked');
    }

    if (done2) {
        return <Redirect to='/home' />
    }

    if (done) {

        return (
            <div className='projectinfo'>
                <div className="top">
                    <h1 className='name'>{proj.title.split('/')[1]}</h1>
                    <IconButton onClick={deleteProject}>
                        <DeleteOutlineOutlinedIcon />

                    </IconButton>

                </div>

                <div className="settings">
                    <div className="settings__top">

                        <h1>Settings</h1>
                        <IconButton onClick={() => setOpen(o => !o)}>

                            <EditIcon />
                        </IconButton>
                    </div>

                    <div className="notification">
                        <NotificationsActiveOutlinedIcon />
                        <h3>Deadline:</h3>
                        <h3 className='date'>{deadline}</h3>
                    </div>
                    <div className="settings_info">
                        <h3>Min commit per week</h3>

                        <p>{proj.setMinCommit}</p>

                    </div>

                    <div className="settings_info">
                        <h3>Commits this week</h3>
                        <p>4</p>

                    </div>
                </div>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}  >
                    <div className='edit_pop'>
                        <div>
                            <h3>Deadline</h3>
                            <input type="text" placeholder="Enter Deadline" />
                        </div>
                        <div>
                            <h3>Set Min commit</h3>
                            <input type="text" placeholder="Enter your min commit" />
                        </div>
                        <div>
                            <h3>Alarm Type</h3>
                            <select name="alarm" id="alarm">
                                <option value="false">Email only</option>
                                <option value="true">Email and Twitter</option>
                            </select>


                        </div>
                        <div>
                            <h3>Billing</h3>
                            <select name="billing" id="billing">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <button>Submit</button>

                    </div>

                </Popup>
            </div>
        );
    } else {
        return (
            <h1>loading</h1>
        )
    }
};

export default ProjectInfo;