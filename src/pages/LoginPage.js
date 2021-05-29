import React from 'react'
import Input from '../components/Input/Input'
import { connect } from "react-redux";
import * as authActions from '../redux/authActions'

class LoginPage extends React.Component {

    state ={ 
        username:"",password:"",ispendingApiCall:false
    }


    onChange=(e)=>{
         this.setState({[e.target.name]:e.target.value})
    }

    onClickLogin=()=>{
        const { username,password} = this.state
        this.setState({ispendingApiCall:true})
        this.props.actions.postLogin({ username,password}).then(()=>{
            this.setState({ispendingApiCall:false},()=>{
                this.props.history.push('/')
            })
            
        })
        .catch(error=>{
            this.setState({ispendingApiCall:false})
        })
    }


    render(){
        return (
            <div className="form-container">
            <h1 data-testid='header' className="text-center">Login</h1>
            <div className="col-12 md-3">
                <Input placeholder="Your username" value={this.state.username} name="username" onChange={this.onChange} className="form-control" label="Username"/>
            </div>
            <div className="col-12 md-3">
                <label>Password</label>
                <input placeholder="Your password" type="password" name="password" value={this.state.password}  onChange={this.onChange} className="form-control"/>
            </div>
            <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={this.onClickLogin} disabled={this.state.ispendingApiCall}>
                    
                {
                    this.state.ispendingApiCall && <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                }
                   Login</button>
            </div> 
        </div>
        )
    }
}


LoginPage.defaultProps ={
    actions:{
        postLogin:()=> new Promise((resolve, reject)=>{
            resolve({})
        }),
    }, 
    history : {
        push:()=>{}
    },
    dispatch : ()=>{}
}



const mapDispatchToProps = dispatch =>{
    return {
        actions : {
            postLogin : (body)=> dispatch(authActions.loginHandler(body))
        }
    }
}

export default connect(null,mapDispatchToProps)(LoginPage)