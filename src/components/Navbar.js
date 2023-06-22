import React from 'react';
import {AppBar, Toolbar} from '@mui/material';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../store/user-slice';

const Navbar = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const logoutHandler = () => {
        localStorage.removeItem('session');
        localStorage.removeItem('jh-google-oauth-token');
        dispatch(userActions.logout());
    }

    let userDisplay;

    if (user !== undefined && user.email) {
        userDisplay = (
            <nav>
                {user.email}
                <Button onClick={logoutHandler}
                        variant="outlined"
                        sx={{my: 1, mx: 1.5}}
                >
                    Logout
                </Button>
            </nav>
        );
    } else {
        userDisplay = (
            <nav>
                <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/users/login"
                    sx={{my: 1, mx: 1.5}}
                >
                    Login
                </Button>
                <Button
                    component={RouterLink}
                    variant="outlined"
                    to="/users/signup"
                    sx={{my: 1, mx: 1.5}}>
                    Sign up
                </Button>
            </nav>
        );
    }

    return (
        <AppBar position="static"
                color="default"
                elevation={0}
                sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}>
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Link component={RouterLink}
                      underline="none"
                      color="text.primary"
                      to="/"
                      noWrap
                      sx={{flexGrow: 1}}>
                    <Typography variant="h6" color="inherit">
                        John Hancock
                    </Typography>
                </Link>
                <nav>
                    {userDisplay}
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
