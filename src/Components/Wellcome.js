import React from 'react';
import { Link } from 'react-router-dom';
const Wellcome = () => {
    return (
        <div>
            <Link to='/signin'> Login Page</Link>
            <Link to='/login'> Registration Page</Link>

        </div>
    );
};

export default Wellcome;