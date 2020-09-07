import React from 'react';
import { Add } from '@material-ui/icons';
import { useStateValue } from '../store/StateProvider';



const CreateBtn = () => {
    const [{ token },] = useStateValue();
    const axios = require('axios');


    const createproj = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://commitspy.herokuapp.com/api/users/repos`, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then((resp) => {
            console.log(resp);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div onClick={createproj} className='createbtn'>
            <Add />
        </div>
    );
};

export default CreateBtn;