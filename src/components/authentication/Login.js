import React, { Component } from 'react'
import { login, authenticate } from '../../apiCalls/auth'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            error: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.doRedirect = this.doRedirect.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(event) {
        const { email, password } = this.state
        login({ email, password })
        .then(loggedUser => {
            if (loggedUser.err) {
                this.setState({error: loggedUser.err})
            }
            else {
                authenticate(loggedUser, () => {
                    this.setState({redirect: true})
                })
            }
            console.log(loggedUser)
        })
        .catch(err => console.log(err))
        event.preventDefault()
    }
    
    doRedirect() {
        if (this.state.redirect)
        this.props.history.push('/')
    }
    
    render() {
        return (
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <input type="email" name="email" onChange={this.handleChange} />
                    <input type="password" name="password" onChange={this.handleChange} />
                    <input type="submit" value="Login"/>
                    {this.doRedirect()}
                </form>
            </div>
        )
    }
}
export default Login