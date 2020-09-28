import React from 'react';
import { useParams } from 'react-router-dom';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { Twitter } from '@material-ui/icons';



const ProjectInfo = ({ projects, onKen, token, location }) => {

    // STATES
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [done, setDone] = useState(false)
    const [done2, setDone2] = useState(false)
    const [maxtime, setMaxtime] = useState(7)
    const [mincommit, setMincommit] = useState(15)
    const [alarm, setAlarm] = useState(0)
    const [billing, setBilling] = useState(false);
    const [test, setTest] = useState(false)
    const [tweet, setTweet] = useState(0)

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


    }, [test])
    let date = new Date(proj.trigger);
    let deadline = date.toDateString()
    // let maxtest = Math.floor((proj / 1000) / (86400))

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
    //geteditvalue
    let realtime = Math.floor((maxtime * 1000) * (86400))
    let realalarm = Number(alarm)
    let realbilling = Boolean(Number(billing))
    const getEdit = () => {

        let project = {
            _id: roomId,
            maxTime: realtime,
            setMinCommit: Number(mincommit),
            alarmType: realalarm,
            billing: realbilling
        }
        const axios = require('axios');
        axios.put(`https://commitspy.herokuapp.com/api/project/`, { project }, {
            headers: { 'authorization': `Bearer ${token}` },

        }).then(function (response) {
            console.log(response);
            setTweet(realalarm)

            setTest(o => !o)
            closeModal()



        }).catch(function (error) {
            console.log(error);
        });
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

                    <div className="settings_info alarm">
                        <h3>Alarm Type</h3>
                        <div>
                            <MailOutlineIcon className='msg' />
                            <Twitter className={tweet === 1 ? 'show' : 'tweet'} />
                        </div>

                    </div>
                </div>
                <Popup open={open} closeOnDocumentClick onClose={closeModal}  >
                    <div className='edit_pop'>
                        <div className='maxmin'>
                            <h3>Maxtime</h3>
                            <input type="text" placeholder="Enter Deadline" value={maxtime} onChange={e => setMaxtime(e.target.value)} />
                        </div>
                        <div className='maxmin'>
                            <h3>Set Min commit</h3>
                            <input type="text" placeholder="Enter your min commit" value={mincommit} onChange={e => setMincommit(e.target.value)} />
                        </div>
                        <div className='alabill'>
                            <h3>Alarm Type</h3>
                            <select name="alarm" id="alarm" value={alarm} onChange={(e) => setAlarm(e.target.value)}>
                                <option value="0">Email only</option>
                                <option value="1">Email and Twitter</option>
                            </select>


                        </div>
                        <div className='alabill'>
                            <h3>Billing</h3>
                            <select name="billing" id="billing" value={billing} onChange={(e) => setBilling(e.target.value)}>
                                <option value='0' >No</option>
                                <option value='1'>Yes</option>
                            </select>
                        </div>

                        <button onClick={getEdit}>Submit</button>
                        <button onClick={closeModal}>Cancle</button>


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