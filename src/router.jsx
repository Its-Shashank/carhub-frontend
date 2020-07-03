import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RentCar from './components/lendCar/RentCar'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import Home from './components/Home/Home'
import RideCar from './components/getRide/Ride'
import PrivateRoute from './apiCalls/PrivateRoute'

function router() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/'
                        exact render={props => (
                            <Home {...props} />
                        )}
                    />
                    <Route path='/signup'
                        exact component={Signup}
                    />
                    <Route path='/login'
                        exact render={props => (
                            <Login {...props} />
                        )}
                    />
                    <PrivateRoute path='/rentcar'
                        exact component={RentCar}
                    />
                    <Route path='/getride'
                        exact component={RideCar}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default router