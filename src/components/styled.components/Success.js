import React from 'react'
import './success.scss'

function Success(props) {
    return (
        <div className='success'>
            {props.message}
        </div>
    )
}

export default Success
