import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

const initialState = {
    emailError:     '',
    firstNameError: '',
    lastNameError:  '',
    passwordError:  '',
    backdropOpen:   false,
}

const Signup = (props) => {
    const [state, setState] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let createUserRequest = {
            firstName: data.get('firstName'),
            lastName:  data.get('lastName'),
            email:     data.get('email'),
            password:  data.get('password'),
        }
        let errFound          = false

        if (createUserRequest.firstName === '') {
            setState({
                firstNameError: 'Name cannot be blank',
            })
            errFound = true;
        }

        if (createUserRequest.lastName === '') {
            setState({
                lastNameError: 'Name cannot be blank',
            })
            errFound = true;
        }

        if (createUserRequest.email === '') {
            setState({
                emailError: 'Email address cannot be empty',
            })
            errFound = true;
        }

        if (createUserRequest.password === '') {
            setState({
                passwordError: 'Password cannot be empty',
            })
            errFound = true
        }

        if (errFound) {
            return;
        }

        axios.post(
            process.env.REACT_APP_PLATFORM_PATH + '/users',
            createUserRequest)
            .then(response => console.log(response))
            .catch((error) => {
                if (error.response.status === 409) {
                    setState({
                        emailError: 'Email already exists',
                    })
                }
                console.log(error.response)
                // console.log('Error creating account: ', error)
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop:     8,
                    display:       'flex',
                    flexDirection: 'column',
                    alignItems:    'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                helperText={state.firstNameError}
                                error={state.firstNameError !== ''}
                                // onChange={validateFirstName.bind(this)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                helperText={state.lastNameError}
                                error={state.lastNameError !== ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                error={state.emailError !== ''}
                                helperText={state.emailError}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                error={state.passwordError !== ''}
                                helperText={state.passwordError}
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/users/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;