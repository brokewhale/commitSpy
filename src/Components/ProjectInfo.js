import React from 'react';
import { useParams } from 'react-router-dom';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from "react-router-dom";


const ProjectInfo = ({ projects, token, onKen }) => {
    const { roomId } = useParams();
    const [done, setDone] = useState(false)
    // console.log(roomId);
    const proj = projects[projects.findIndex(x => x.git_id === `${roomId}`)]
    console.log(proj);
    let projectName = proj.title.split('/')
    let date = new Date(proj.trigger);
    let deadline = date.toDateString()

    const deleteProject = () => {

        const axios = require('axios');
        axios.delete(`https://commitspy.herokuapp.com/api/project/projects/${proj._id}`, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then(function (response) {
            // console.log(response);
            onKen(response)
            setDone(true)


        }).catch(err => {
            console.log(err);
        })
        console.log('clicked');
    }

    if (done) {


        return <Redirect to="/home" />;
    }


    return (
        <div className='projectinfo'>
            <div className="top">
                <h1 className='name'>{projectName[1]}</h1>
                <IconButton onClick={deleteProject}>
                    <DeleteOutlineOutlinedIcon />

                </IconButton>

            </div>

            <div className="settings">
                <h1>Settings</h1>

                <div className="notification">
                    <NotificationsActiveOutlinedIcon />
                    <h3>Deadline:</h3>
                    <h3 className='date'>{deadline}</h3>
                </div>
                <div className="settings_info">
                    <h3>Min commit per week</h3>
                    <p>{proj.setMinCommit}</p>
                    <IconButton  >

                        <EditIcon />
                    </IconButton>
                </div>
                {/* <div className="settings_info">
                    <h3>Notification</h3>
                    <p>4</p>
                    <IconButton>

                        <EditIcon />
                    </IconButton>
                </div> */}
                <div className="settings_info">
                    <h3>Commits this week</h3>
                    <p>4</p>
                    <IconButton>

                        <EditIcon />
                    </IconButton>
                </div>
            </div>
            {/* <h3>{JSON.stringify(proj)}</h3> */}
        </div>
    );
};

export default ProjectInfo;