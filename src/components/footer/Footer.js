import React from 'react'
import { Facebook, Twitter, Instagram, LinkedIn, Favorite } from '@material-ui/icons'
import '../Home/home.scss'

const Footer = (props) => {
    return (
        <div className='footer-container'>
            <footer className='footer'>
                <h1>CarHub</h1>
                <div className='footer-links'>
                    <h3
                        className='footer-link'
                        onClick={() => props.history.push('/getride')}
                    >Ride Now</h3>
                    <h3
                        className='footer-link'
                        onClick={() => props.history.push('/rentcar')}
                    >Rent Car</h3>
                    <h3 className='footer-link'>About</h3>
                    <h3 className='footer-link'>Contact</h3>
                </div>
                
                <div className='footer-icons'>
                    <Facebook style={{
                        color: 'rgb(58,85,159)',
                    }} className='footer-icon' />
                    <Twitter style={{
                        color: 'rgb(1,173,237)'
                    }} className='footer-icon' />
                    <Instagram style={{
                        color: 'rgb(251,61,87)'
                    }} className='footer-icon' />
                    <LinkedIn style={{
                        color: 'rgb(22,134,176)'
                    }} className='footer-icon' />
                </div>
            </footer>
            <h4 className='copyright'>
                © 2020 CarHub. Made with love
                <Favorite style={{
                    color: 'red'
                }} />
            </h4>
        </div>
    )
}
export default Footer