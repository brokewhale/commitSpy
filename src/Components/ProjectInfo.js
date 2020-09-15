import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectInfo = ({ projects }) => {
    const { roomId } = useParams();
    // console.log(roomId);
    const proj = projects[projects.findIndex(x => x.git_id == `${roomId}`)]
    return (
        <div className='projectinfo'>
            <h1>myproject info</h1>
            <h3>{JSON.stringify(proj)}</h3>
        </div>
    );
};

export default ProjectInfo;