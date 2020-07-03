import React, { useState } from 'react'
import './tile.scss'
import { updateUser } from '../../apiCalls/auth'
import { useHistory } from 'react-router-dom'

function ConfirmOrder(props) {
    const [ordered, setOrdered] = useState(false)
    const [redirect, setRedirect] = useState(false)
    
    const history = useHistory()
    
    const doRedirect = () => {
        redirect && history.push('/')
    }
    
	const backward = e => {
        e.preventDefault()
        localStorage.removeItem('orderDays')
		props.prevStep()
    }

    const orderNow = e => {
        setOrdered(false)
        setRedirect(false)
        const dates = localStorage.getItem('dates')
        console.log(dates)
        if (dates) {
            if (localStorage.getItem('user')) {
                console.log('inside ordernow')
                const formData = new FormData()
                formData.append('order', props.car._id)
                formData.append('orderDateFrom', dates[0].toString())
                formData.append('orderExpireDate', dates[1].toString())
                formData.append('totalCost', parseInt(props.car.price) * parseInt(localStorage.getItem('orderDays')))

                updateUser(formData, props.car.user._id)
                .then(updatedUser => {
                    console.log('ordered')
                    const ride = {
                        rideId: props.car._id,
                        rideName: props.car.brand + ' ' + props.car.modelName,
                        ridePrice: props.car.price,
                        days: localStorage.getItem('orderDays'),
                        totalCost: parseInt(props.car.price) * parseInt(localStorage.getItem('orderDays'))
                    }
                    localStorage.setItem('rideId', ride.rideId)
                    localStorage.setItem('rideName', ride.rideName)
                    setOrdered(true)
                    setTimeout(() => {
                        setRedirect(true)
                    }, 3000)
                    console.log(updatedUser)
                })
                .catch(err => console.log(err))
            }
        }
        e.preventDefault()
    }
    
    return (
        <div className='order-confirm-container'>
            {doRedirect()}
            <h1>Confirm Order!</h1>
            {
                localStorage.getItem('orderDays') && props.car &&
                <div className='order-details'>
                    <h4> Car name is {props.car.brand} {props.car.modelName} </h4>
                    <h4> Cost of car per day {props.car.price} </h4>
                    <h4> Number of days {localStorage.getItem('orderDays')} </h4>
                    <h4> {parseInt(props.car.price) * parseInt(localStorage.getItem('orderDays'))} </h4>
                </div>
            }

            {
                ordered &&
                <h3 className='success-msg'>Car successfully ordered</h3>
            }
            <div className='order-btns'>
                <button onClick={backward} className='ride-btn'>Back</button>
                <button onClick={orderNow} className='ride-btn'>Order Now</button>
            </div>
        </div>
    )
}

export default ConfirmOrder
