import React from 'react';
import { Avatar } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
// import Popup from 'reactjs-popup';
import { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CancelOutlined } from '@material-ui/icons';
import ChartTotal from './ChartTotal'
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useStateValue } from '../store/StateProvider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';







const User = ({ token, name, img, email, projects, wallet, proj }) => {
    // eslint-disable-next-line
    const [{ isLoggedIn }, dispatch] = useStateValue();

    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('')
    const [btnload, setBtnload] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAmount('')
        setBtnload(false)

    }

    const sendpayment = () => {
        setBtnload(true)
        let payment = {
            amount: amount * 100,
            currency: 'NGN'
        }
        let data = { payment };
        const axios = require('axios');
        axios.post(`https://commitspy.herokuapp.com/api/payment/init`, data, {
            headers: { 'authorization': `Bearer ${token}` }
        }).then(function (response) {
            console.log(response.data.authorization_url);
            window.location.href = response.data.authorization_url

            setAmount('')
            setBtnload(false)




        }).catch(err => {
            console.log(err);
        })
    }


    const logout = () => {

        dispatch({
            type: "LOGOUT"
        });

        window.location.href = `http://commitspy.netlify.app/home`;


    }
    return (

        <div className="user">
            <div className="logout">
                <ExitToAppOutlinedIcon onClick={logout} />
                <p>Logout</p>

            </div>
            <Avatar className='logo' alt="name" src={img} />
            <h1>{name}</h1>
            <p>{email}</p>

            <div className="userparams">
                <div className="noofproj card">
                    <p>{projects}</p>
                    <h3>Projects</h3>
                </div>
                <div className="divide"></div>
                <div className="amounti card">
                    <p><span>&#8358;</span>  {wallet}</p>
                    <h3>Wallet</h3>
                </div>
            </div>
            <div className="addmoney" onClick={handleClickOpen}>
                <h3>Add money</h3>
                <PaymentIcon />
            </div>
            <ChartTotal projects={proj} />

            {/* <Popup open={open} closeOnDocumentClick onClose={closeModal}  >

                <form className='pay_pop' noValidate autoComplete="off">
                    <TextField id="outlined-basic" size='small' value={amount} onChange={e => setAmount(e.target.value)} label="Enter Amount (₦)" variant="outlined" />
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<PaymentIcon />}
                        onClick={sendpayment}
                    >
                        {!btnload && <span> PAY</span>} {btnload && <CircularProgress />}
                    </Button>
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<CancelOutlined />}
                        onClick={closeModal}
                    >
                        CANCLE
                    </Button>
                </form>

            </Popup> */}
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <form className='pay_pop' noValidate autoComplete="off">
                        <TextField id="outlined-basic" size='small' value={amount} onChange={e => setAmount(e.target.value)} label="Enter Amount (₦)" variant="outlined" />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<PaymentIcon />}
                        onClick={sendpayment}
                    >
                        {!btnload && <span> PAY</span>} {btnload && <CircularProgress />}
                    </Button>
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<CancelOutlined />}
                        onClick={handleClose}
                    >
                        CANCLE
                    </Button>
                </DialogActions>
            </Dialog>

        </div>


    );
};

export default User;