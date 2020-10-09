import React from 'react';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const CreateBtn = () => {

    return (
        <Link to='/home/repos' className='createbtn'>
            <div>

                <Add />
            </div>
        </Link >
    );
};

export default CreateBtn;