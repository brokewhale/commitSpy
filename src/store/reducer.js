export const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    user: null,
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    proxy_url: process.env.REACT_APP_PROXY_URL,
    myuser: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
            // localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("myuser", JSON.stringify(action.payload.myuser))

            console.log(action.payload.isLoggedIn)
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                // user: action.payload.user,
                myuser: action.payload.myuser

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