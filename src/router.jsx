import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'

function router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/'
                        exact component={App}
                    />
                    <Route path='/signup'
                        exact component={Signup}
                    />
                    <Route path='/login'
                        exact component={Login} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default router