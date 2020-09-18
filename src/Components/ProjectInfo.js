import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectInfo = ({ projects }) => {
    const { roomId } = useParams();
    // console.log(roomId);
    const proj = projects[projects.findIndex(x => x.git_id === `${roomId}`)]
    return (
        <div className='projectinfo'>
            <h1 className='name'>Commit Spy</h1>

            <div className="settings">
                <h1>Settings</h1>
                <div className="settings_info">
                    <h3>No of Commits</h3>
                    <p>4</p>
                </div>
                <div className="settings_info">
                    <h3>Notification</h3>
                    <p>4</p>
                </div>
                <div className="settings_info">
                    <h3>Commits this week</h3>
                    <p>4</p>
                </div>
            </div>
            {/* <h3>{JSON.stringify(proj)}</h3> */}
        </div>
    );
};

export default ProjectInfo;