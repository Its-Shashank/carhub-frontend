import React, { useEffect, useState } from 'react'
import Navbar from '../nav/Navbar'
import { getUser, getCar } from '../../apiCalls/auth'

function Dashboard() {

    const [me, setMe] = useState('')
    const [loading, setLoading] = useState(false)
    const [ car, setCar ] = useState('')

    useEffect(() => {
        setLoading(true)
        setMe('')
        getUser(JSON.parse(localStorage.getItem('user')).user._id)
        .then(userdata => {
            getCar(userdata.car)
            .then(cardata => {
                setLoading(false)
                setCar(cardata)
                console.log(cardata)
            })
            .catch(err => console.log(err))
            setMe(userdata)
            console.log(userdata)
        })
        .catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <Navbar />
            {!loading && 
                <div>
                    <h1>Welcome {me.name} </h1>
            <h2>Car rented.</h2>
            <h4> Your car brand is {car.brand} </h4>
            <h4> Your car model is {car.modelName} </h4>
            <h4> Purchase year {car.modelName} </h4>
            <h4> Price of booking per day {car.price} </h4>
                </div>
            }
            
        </div>
    )
}
export default Dashboard