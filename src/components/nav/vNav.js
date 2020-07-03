import React, { useState, useEffect } from "react";
import {SwipeableDrawer} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
import { isAuthenticated, signout } from '../../apiCalls/auth'
import './nav.scss'
import './vNav.scss'
import { Menu, Close } from '@material-ui/icons'

function Nav(props) {
  const [state, setState] = useState({
    top: false
  })
  const [name, setName] = useState('')
  const [redirect, setRedirect] = useState(false)

  const doRedirect = () => {
    if (redirect) {
        props.history.push('/')
    }
}
  
  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      // console.log(localStorage.getItem('user'))
      setName(JSON.parse(localStorage.getItem('user')).user.name)
    }
  }, [])

  return (
    <div className='vnav-container'>
      {["top"].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
              <Menu className='menu-icon' />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
        <div className='drawer'>
            <div onClick={toggleDrawer(anchor, false)} className='close-icon'>
                <Close  />
            </div>
            <div className='vertical-nav-container'>
                <Link className='vertical-link' to='/'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Home
                </Link>
                <Link className='vertical-link' to='/rentcar'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Rent Car
                </Link>
                <Link className='vertical-link' to='/getride'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Ride Now
                </Link>

                { !isAuthenticated() &&
                  <Link className='vertical-link' to='/login'
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                  >
                  Login
                  </Link>
                }
                { !isAuthenticated() &&
                  <Link className='vertical-link' to='/signup'
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                  >
                  Signup
                  </Link>
                }

                { isAuthenticated() &&
                <Link className='vertical-link' to='/'
                onClick={() => {
                  toggleDrawer(anchor, false)
                  signout(() => {
                      setRedirect(true)
                      doRedirect()
                  })
              }}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                  Logout
                </Link>
                }
                { isAuthenticated() &&
                <Link className='vertical-link' to='/dashboard'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                  {name}
                </Link>
                }
            </div>
        </div>
            
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default Nav