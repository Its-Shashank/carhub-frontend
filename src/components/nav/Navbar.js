import React, { useState, useEffect } from 'react'
import './nav.scss'
import { Link } from 'react-router-dom'
import { DriveEtaOutlined } from '@material-ui/icons'
import VNav from './vNav'
import { isAuthenticated, signout } from '../../apiCalls/auth'

const Navbar = (props) => {
    const [redirect, setRedirect] = useState(false)
    const [name, setName] = useState('')

    const doRedirect = () => {
        if (redirect) {
            props.history.push('/')
        }
    }
    
    useEffect(() => {
        if (localStorage.getItem('user')) {
          setName(JSON.parse(localStorage.getItem('user')).user.name)
        }
      }, [])
    return (
        <div>
            <div className='nav-container'>
                <Link className='navbar-brand' to='/'>
                <DriveEtaOutlined style={{fontSize: '1.5em'}} />Hub
                </Link>
                <ul className='nav-links'>
                    <Link className='nav-link' to='/rentcar'>
                        <li className='link'>Lend</li>
                    </Link>
                    <Link className='nav-link' to='/getride'>
                        <li className='link'>Ride</li>
                    </Link>
                    { !isAuthenticated() && 
                    <Link className='nav-link' to='/login'>
                        <li className='link'>Login</li>
                    </Link>
                    }
                    { !isAuthenticated() && 
                    <Link className='nav-link' to='/signup'>
                        <li className='link'id='different-link'>Signup</li>
                    </Link>
                    
                    }
                    { isAuthenticated() &&
                    <Link className="nav-link"
                    onClick={() => {
                        signout(() => {
                            setRedirect(true)
                            doRedirect()
                        })
                    }}
                >
                        <li className='link'>Logout</li>
                    </Link>
                    
                    }
                    { isAuthenticated() &&
                    <Link className='nav-link' to='/dashboard'>
                        <li className='link'id='different-link'>{name}</li>
                    </Link>
                    
                    }
                </ul>
            <VNav id='vertical-nav' />
            </div>
        </div>

    )
}

export default Navbar