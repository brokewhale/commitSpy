import React from 'react';
import { useParams } from 'react-router-dom';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import EditIcon from '@material-ui/icons/Edit';

const ProjectInfo = ({ projects }) => {
    const { roomId } = useParams();
    // console.log(roomId);
    const proj = projects[projects.findIndex(x => x.git_id === `${roomId}`)]
    console.log(proj);
    let projectName = proj.title.split('/')
    let date = new Date(proj.trigger);
    // console.log(date.toDateString());
    let deadline = date.toDateString()
    // date.setTime(proj.trigger)
    // console.log(proj.trigger)

    return (
        <div className='projectinfo'>
            <h1 className='name'>{projectName[1]}</h1>

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
                    <EditIcon />
                </div>
                <div className="settings_info">
                    <h3>Notification</h3>
                    <p>4</p>
                    <EditIcon />
                </div>
                <div className="settings_info">
                    <h3>Commits this week</h3>
                    <p>4</p>
                    <EditIcon />
                </div>
            </div>
            {/* <h3>{JSON.stringify(proj)}</h3> */}
        </div>
    );
};

export default ProjectInfo;