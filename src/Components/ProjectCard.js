import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id }) => {
    return (
        <Link className='projectcard' to={`/home/project/${id}`}>

            <div className='initials'>AB</div>
            <p className='projname'>project name</p>

        </Link>
    );
};

export default ProjectCard;