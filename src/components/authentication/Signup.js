import React, { Component } from 'react'
import './auth.scss'
import { signup } from '../../apiCalls/auth'

class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(event) {
        const { name, email, password } = this.state
        signup({ name, email, password })
        .then(user => {
            if (user.err) {
                console.log(user)
            }
            else {
                console.log(user)
                console.log('new user created')
            }
        })
        event.preventDefault()
    }
    
    render() {
        return (
            <div>
                <form className='form-data' onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange} />
                    <input type="email" name="email" onChange={this.handleChange} />
                    <input type="password" name="password" onChange={this.handleChange} />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Signup