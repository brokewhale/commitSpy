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
import EditIcon from '@material-ui/icons/Edit';







const User = ({ token, name, img, email, projects, wallet, proj, twitter }) => {
    // eslint-disable-next-line
    const [{ isLoggedIn }, dispatch] = useStateValue();

    const [open, setOpen] = useState(false);
    const [editopen, setEditopen] = useState(false);
    //Payment
    const [amount, setAmount] = useState('')
    const [btnload, setBtnload] = useState(false)
    //Details
    const [twitterUname, setTwitterUname] = useState(twitter)
    const [userpass, setUserpass] = useState('')
    const [confirmpass, setConfirmpass] = useState('')
    // const [errormsg, setErrormsg] = useState('')
    const [errorui, setErrorui] = useState(false)
    const [errorui1, setErrorui1] = useState(false)





    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEditOpen = () => {
        setEditopen(true)
    }
    const handleEditClose = () => {
        setEditopen(false)
        setUserpass('')
        setConfirmpass('')
        // setErrormsg('')
        setErrorui1(false)
        setErrorui(false)


    }

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

    const editDetails = () => {
        const axios = require('axios');

        // setErrormsg('')
        setErrorui1(false)
        setErrorui(false)
        if (userpass.length > 0) {
            if (userpass.length >= 8) {

                if (userpass === confirmpass) {
                    let user = {
                        twitter: twitterUname,
                        password: userpass
                    }
                    axios.put(`https://commitspy.herokuapp.com/api/users/me`, { user }, {
                        headers: { 'authorization': `Bearer ${token}` },

                    }).then(function (response) {
                        console.log(response);


                        handleEditClose()



                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    // console.log('not correct');
                    // setErrormsg('Password must be the same')
                    setErrorui1(true)
                    return false
                }
            } else {
                // console.log('must be more than or equall 8 characters');
                // setErrormsg('password must be equal to or more than eight(8) Characters')
                setErrorui(true)
            }
        } else {
            // console.log('dont want to change password send twitter only');

            let user = {
                twitter: twitterUname,
                // password = userpass
            }
            axios.put(`https://commitspy.herokuapp.com/api/users/me`, { user }, {
                headers: { 'authorization': `Bearer ${token}` },

            }).then(function (response) {
                console.log(response);


                handleEditClose()



            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    return (

        <div className="user">
            <div className="edit-icon" onClick={handleEditOpen}>
                <EditIcon />
                <p>Edit Details</p>

            </div>
            <div className="logout" onClick={logout}>
                <ExitToAppOutlinedIcon />
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
                    <p>{wallet} </p>
                    <h3>CommitCoin</h3>
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
                        CANCEL
                    </Button>
                </form>

            </Popup> */}

            {/* EDIT Details DIALOG */}

            <Dialog disableBackdropClick disableEscapeKeyDown open={editopen} onClose={handleEditClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <form className='pay_pop' noValidate autoComplete="off">
                        <TextField id="outlined-basic" size='small' value={twitterUname} onChange={e => setTwitterUname(e.target.value)} label="Enter new twitter handle" variant="outlined" />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            variant="outlined"
                            size='small'
                            value={userpass}
                            onChange={e => setUserpass(e.target.value)}
                            error={errorui}
                            helperText="password must be equal to or more than eight(8) Characters"
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            size='small'
                            value={confirmpass}
                            onChange={e => setConfirmpass(e.target.value)}
                            helperText='Password must be the same'
                            error={errorui1}

                        />
                        {/* <p className='errormsg'>{errormsg}</p> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<PaymentIcon />}
                        onClick={editDetails}
                    >
                        {/* {!btnload && <span> PAY</span>} {btnload && <CircularProgress className='dialog-loadd' />} */}
                        SAVE
                    </Button>
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<CancelOutlined />}
                        onClick={handleEditClose}
                    >
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>



            {/* PAYMENT DIALOG */}


            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select the plan you want</DialogTitle>
                <DialogContent>
                    <form className='pay_pop' noValidate autoComplete="off">
                        {/* <TextField id="outlined-basic" size='small' value={amount} onChange={e => setAmount(e.target.value)} label="CommitCoin" variant="outlined" /> */}
                        <div className="ten">
                            <span>10 CommitCoin for <span>$5</span> </span>


                            <Button
                                variant="contained"
                                color="primary"
                                size='small'

                            // startIcon={<PaymentIcon />}
                            >
                                Buy
                             </Button>
                        </div>
                        <div className="ten">
                            <span>50 CommitCoin for <span>$10</span> </span>


                            <Button
                                variant="contained"
                                color="primary"
                                size='small'


                            // startIcon={<PaymentIcon />}
                            >
                                Buy
                             </Button>
                        </div>
                        <div className="ten">
                            <span>100 CommitCoin for <span>$15</span> </span>


                            <Button
                                variant="contained"
                                color="primary"
                                size='small'

                            // startIcon={<PaymentIcon />}
                            >
                                Buy
                             </Button>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    {/* <Button
                        variant="outlined"
                        color="default"
                        startIcon={<PaymentIcon />}
                        onClick={sendpayment}
                    >
                        {!btnload && <span> PAY</span>} {btnload && <CircularProgress className='dialog-loadd' />}
                    </Button> */}
                    <Button
                        variant="outlined"
                        color="default"
                        startIcon={<CancelOutlined />}
                        onClick={handleClose}
                    >
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>




        </div>


    );
};

export default User;