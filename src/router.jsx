import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RentCar from './components/lendCar/RentCar'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import Navbar from './components/nav/Navbar'

function router() {
    return (
        <div>
            <BrowserRouter>
            <Navbar />
                <Switch>
                    {/* <Route path='/'
                        exact component={App}
                    /> */}
                    <Route path='/signup'
                        exact component={Signup}
                    />
                    <Route path='/login'
                        exact component={Login}
                    />
                    <Route path='/rentcar'
                        exact component={RentCar}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default router