import React from 'react';
import {AppBar, Toolbar} from '@mui/material';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = (props) => {
    let userDisplay;

    if (props.user !== undefined && props.user.email) {
        console.log(props.user);
        userDisplay = (
            <nav>
                {props.user.email}
                <Button
                    variant="outlined"
                    component={RouterLink}
                    to="/users/logout"
                    sx={{my: 1, mx: 1.5}}
                >
                    Logout
                </Button>
            </nav>
        );
    } else {
        console.log('userdisplay');
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
