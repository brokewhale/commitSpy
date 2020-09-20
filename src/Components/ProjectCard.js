import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, name }) => {
    let projectName = name.split('/')
    return (
        <Link className='projectcard' to={`/home/project/${id}`}>

            <div className='initials'>{projectName[1][0] + projectName[1][2]}</div>
            <p className='projname'>{projectName[1]}</p>

        </Link>
    );
};

export default ProjectCard;