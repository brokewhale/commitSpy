export const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    forcereload: JSON.parse(localStorage.getItem("isLoggedIn")) || false,

    user: null,
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    proxy_url: process.env.REACT_APP_PROXY_URL,
    token: JSON.parse(localStorage.getItem("token")) || null,
    repos: JSON.parse(localStorage.getItem("repos")) || [],


};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
            // localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("token", JSON.stringify(action.payload.token))
            // localStorage.setItem("repos", JSON.stringify(action.payload.repos))
            localStorage.setItem("forcereload", JSON.stringify(action.payload.forcereload))


            console.log(action.payload.isLoggedIn)
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                // user: action.payload.user,
                token: action.payload.token,
                forcereload: action.payload.forcereload

            };
        }
        case "GETREPO": {
            localStorage.setItem("repos", JSON.stringify(action.payload.repos))


            return {
                ...state,
                repos: action.payload.repos,


            };
        }
        case "LOGOUT": {
            localStorage.clear()
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        default:
            return state;
    }
};

export default reducer;