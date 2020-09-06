import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = () => {
    return (
        <Link className='projectcard' to='/home/project'>

            <div className='initials'>AB</div>
            <p className='projname'>project name</p>

        </Link>
    );
};

export default ProjectCard;