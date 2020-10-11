import React from 'react';
import { Link } from 'react-router-dom';
const Wellcome = () => {
    return (
        <div className='welcome'>
            <Link to='/signin'> Login Page</Link>
            <Link to='/register'> Registration Page</Link>

        </div>
    );
};

export default Wellcome;