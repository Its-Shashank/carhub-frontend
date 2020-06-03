import React, { Component } from 'react'
import './nav.scss'
import { Link } from 'react-router-dom'
import { DriveEtaOutlined } from '@material-ui/icons'
import VNav from './vNav'

class Navbar extends Component {
    render() {
    
        return (
            <div>
                <div className='nav-container'>
                    <ul className='navbar-brand'>
                    <DriveEtaOutlined /><li>Hub</li>
                    </ul>
                    <ul className='nav-links'>
                        <Link className='nav-link' to='/rentcar'><li className='link'>Lend</li></Link>
                        <Link className='nav-link' to='/getride'><li className='link'>Ride</li></Link>
                        <Link className='nav-link' to='/login'><li className='link'>Login</li></Link>
                        <Link className='nav-link' to='/signup'><li className='link'id='different-link'>Signup</li></Link>
                    </ul>
                    <VNav id='vertical-nav' />
                </div>
            </div>

        )
    }
}
export default Navbar