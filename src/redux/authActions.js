import * as apiCalls from '../api/apiCalls'
export const loginSuccess =(loginUserData) =>{
    return {
        type :'LOGIN_SUCCESS',
        payload: loginUserData
    }
}


/**
 * Here we don't have wrapper for triggering dispatch outside the react component
 * WHen React component is wrapped using connect: we can access this.props.dispatch
 * // We can do this logic there itself but code get bigger and loses readability & difficult to find bugs easily
export const loginHandler =(credentials) => {
    return apiCalls.login(credentials).then(response=>{
        dispatch(authActions.loginSuccess({...response.data,password:credentials.password}))
            return response
    })
}
 */
//NOTE : Here thunk plays the role: by just wrapper loginHandler by providing acces for dispatch method as arugment
export const loginHandler =(credentials) => (dispatch) =>{
    return apiCalls.login(credentials).then(response=>{
        debugger
        dispatch(loginSuccess({...response.data,password:credentials.password}))
        debugger
        return response
    })
}
