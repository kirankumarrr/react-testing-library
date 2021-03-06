import React, { useState } from 'react'
import Input from '../components/Input/Input'
import * as authActions from '../redux/authActions'
import { useDispatch, useSelector } from "react-redux";
const LoginPage=(props)=>{
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ispendingApiCall, setIspendingApiCall] = useState(false)

    const onChangeUsername=(e)=> setUsername(e.target.value)
    const onChangePassword=(e)=> setPassword(e.target.value)



    const onClickLogin=()=>{
        setIspendingApiCall(true)
        const body = {
            username,
            password
          }; 
        dispatch(authActions.loginHandler(body))
        .then(()=>{
            setIspendingApiCall(false)
            props.history.push('/')  
        })
        .catch(error=>{
            setIspendingApiCall(false)
        })
    }


    return (
        <div className="form-container">
        <h1 data-testid='header' className="text-center">Login</h1>
        <div className="col-12 md-3">
            <Input placeholder="Your username" value={username} name="username" onChange={onChangeUsername} className="form-control" label="Username"/>
        </div>
        <div className="col-12 md-3">
            <label>Password</label>
            <input placeholder="Your password" type="password" name="password" value={password}  onChange={onChangePassword} className="form-control"/>
        </div>
        <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={onClickLogin} disabled={ispendingApiCall} data-testid='login-button'>
                
            {
                ispendingApiCall && <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            }
               Login</button>
        </div> 
    </div>
    )
}


export default LoginPage