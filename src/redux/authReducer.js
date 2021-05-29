const initialState = {
    id:0,
    username:'',
    displayName:'',
    image:'',
    password:'',
    isLoggedIn:false
}
function authReducer(state=initialState,action){

    if(action.type==='LOGOUT_SUCCESS'){
        return {...initialState}
    }
    else if(action.type==='LOGIN_SUCCESS'){
        return {...initialState,...action.payload,isLoggedIn:true}
    }

    return state;
}

export default  authReducer