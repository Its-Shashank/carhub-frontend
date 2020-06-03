import React from "react";
import {SwipeableDrawer} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
import './nav.scss'
import './vNav.scss'
import { Menu, Close } from '@material-ui/icons'

function Nav() {
  const [state, setState] = React.useState({
    top: false
  })
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
                <Link className='vertical-link' to='/lendcar'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Lend
                </Link>
                <Link className='vertical-link' to='/getride'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Ride
                </Link>
                <Link className='vertical-link' to='/login'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Login
                </Link>
                <Link className='vertical-link' to='/signup'
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
                >
                Signup
                </Link>
            </div>
        </div>
            
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default Nav