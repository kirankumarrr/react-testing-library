import React from 'react'
import Input from '../components/Input/Input'
import { connect } from 'react-redux'
class UserSignUpPage extends React.Component {

    state = {
        displayName: '', username: "", password: "", passwordRepeat: "", ispendingApiCall: false
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onClickSignUp = () => {
        const { displayName, username, password, passwordRepeat } = this.state
        this.setState({ ispendingApiCall: true })
        this.props.actions.postSignup({ displayName, username, password, passwordRepeat })
            .then(res => {
                // this.setState({ispendingApiCall:false},()=>{
                //     this.props.history.push('/')
                // })
                const body ={
                    username, password,
                }
                this.props.actions.postLogin(body)
                    .then(res => {
                        const action = {
                            type: 'LOGIN_SUCCESS',
                            payload: res.data
                        }
                        this.props.dispatch(action)
                        this.setState({ ispendingApiCall: false }, () => {
                            this.props.history.push('/')
                        })

                    })
                    .catch(error => {
                        this.setState({ ispendingApiCall: false })
                    })
            })
            .catch(error => {
                this.setState({ ispendingApiCall: false })
            })
    }

    render() {
        return (
            <div className="form-container">
                <h1 data-testid='user-sign-up-header' className="text-center">Sign Up</h1>
                <div className="col-12 md-3">
                    <Input placeholder="Your display name" value={this.state.displayName} name="displayName" onChange={this.onChange} className="form-control" label="Display Name" />
                </div>
                <div className="col-12 md-3">
                    <label>Username</label>
                    <input placeholder="Your username" name="username" value={this.state.username} onChange={this.onChange} className="form-control" />
                </div>
                <div className="col-12 md-3">
                    <label>Password</label>
                    <input placeholder="Your password" type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control" />
                </div>
                <div className="col-12 md-3">
                    <label>Repeat Password</label>
                    <input placeholder="Repeat your password" type="password" name="passwordRepeat" value={this.state.passwordRepeat} onChange={this.onChange} className="form-control" />
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={this.state.ispendingApiCall}>

                        {
                            this.state.ispendingApiCall && <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                        Sign Up</button>
                </div>
            </div>
        )
    }
}

UserSignUpPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({})
        })
    },
    history: {
        push: () => { }
    }
}

export default connect()(UserSignUpPage)
