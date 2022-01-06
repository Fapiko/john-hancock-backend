import * as React from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import {RedirectBackdrop} from "../RedirectBackdrop";

const theme = createTheme();

type SignupState = {
    emailError: string
    firstNameError: string
    lastNameError: string
    passwordError: string
    backdropOpen: boolean
}

export class SignUp extends React.Component<{}, SignupState> {
    defaultState = {
        emailError: '',
        firstNameError: '',
        lastNameError: '',
        passwordError: '',
        backdropOpen: false
    }
    state = this.defaultState

    // validateName(value: string): boolean {
    //     const regexp = new RegExp('^^[a-zA-Z]{2,255}$')
    //     return regexp.test(value)
    // }
    //
    // validateFirstName(event: ChangeEvent<HTMLInputElement>): void {
    //     const value = event.currentTarget.value
    //     const valid = this.validateName(value)
    //
    //     if (valid) {
    //         this.setState({firstNameError: ''})
    //     } else {
    //         this.setState({firstNameError: 'Provide a valid name'})
    //     }
    // }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
        const data = new FormData(event.currentTarget);

        let createUserRequest = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        }
        let errFound = false
        this.setState(this.defaultState)

        if (createUserRequest.firstName === '') {
            this.setState({
                firstNameError: 'Name cannot be blank'
            })
            errFound = true;
        }

        if (createUserRequest.lastName === '') {
            this.setState({
                lastNameError: 'Name cannot be blank'
            })
            errFound = true;
        }

        if (createUserRequest.email === '') {
            this.setState({
                emailError: 'Email address cannot be empty'
            })
            errFound = true;
        }

        if (createUserRequest.password === '') {
            this.setState({
                passwordError: 'Password cannot be empty'
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
                    this.setState({
                        emailError: 'Email already exists'
                    })
                }
                console.log(error.response)
                // console.log('Error creating account: ', error)
            });
    };

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    helperText={this.state.firstNameError}
                                    error={this.state.firstNameError !== ''}
                                    // onChange={this.validateFirstName.bind(this)}
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
                                    helperText={this.state.lastNameError}
                                    error={this.state.lastNameError !== ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    error={this.state.emailError !== ''}
                                    helperText={this.state.emailError}
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
                                    error={this.state.passwordError !== ''}
                                    helperText={this.state.passwordError}
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
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
                <RedirectBackdrop open={this.state.backdropOpen} redirectUrl={'http://www.google.com'} />
            </Container>
        );
    }
}
