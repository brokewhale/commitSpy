import React from "react";
import { useState } from "react";
import { useStateValue } from "../store/StateProvider";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import GitHubIcon from "@material-ui/icons/GitHub";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const axios = require("axios");
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();
  const [data, setData] = useState({ errorMessage: "", isLoading: false });
  const [btnload, setBtnload] = useState(false);
  const { client_id, redirect_uri } = state;

  const sendLogin = (e, { emailDefault, password }) => {
    console.log(emailDefault);
    e.preventDefault();
    setBtnload(true);
    setData({ ...data, errorMessage: "" });

    axios({
      method: "post",
      url: "https://commitspy.herokuapp.com/api/users/login",
      data: {
        user: {
          email: email ? email : emailDefault,
          password: pass ? pass : password,
        },
      },
    })
      .then(function (response) {
        console.log(response);
        dispatch({
          type: "LOGIN",
          payload: { token: response.data.user.token, isLoggedIn: true },
        });
        setBtnload(false);
      })
      .catch(function (error) {
        console.log(error);
        setData({
          isLoading: false,
          errorMessage: "Login failed Invalid username or password",
        });
        setBtnload(false);
      });
  };

  if (state.isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="login">
      <div className="grid__container">
        <div className="form__container">
          <p className="em1">{data.errorMessage}</p>

          <h2>Sign In</h2>

          <div className="intro">
            A few more clicks to sign in to your account. Manage all your
            projects in one place
          </div>
          <form className="login__form">
            <input
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="pinput"
              type="password"
              placeholder="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="form__btn">
              <button className="login_btn" onClick={sendLogin}>
                Login {btnload && <CircularProgress />}
              </button>
              <Link to="/register" className="signup_btn">
                Sign up
              </Link>
            </div>
          </form>
          <Link to="/forgetpass" className="forget">
            forgot password?
          </Link>
          <button
            // className="login_btn"
            style={{
              padding: "0.75rem",
              marginTop: "10px",
            }}
            onClick={(e) => {
              //   setEmail("teehazzan@gmail.com");
              //   setPass("commitspy1234");
              sendLogin(e, {
                emailDefault: "teehazzan@gmail.com",
                password: "commitspy1234",
              });
            }}
          >
            Guest Login
          </button>

          <button
            className="gitlog"
            onClick={() => {
              window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`;
              setData({ ...data, errorMessage: "" });
            }}
          >
            Login With Github
            <GitHubIcon />
          </button>

          <div className="footer">
            By signing up, you agree to our
            <br />
            <span>Terms and Conditions</span> & <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
