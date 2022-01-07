import {Component} from "react";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import Cookies from "universal-cookie";
import {connect} from "react-redux";
import { setUser } from '../redux/actions'
import { User } from '../types/user'

type LoginState = {
    errorMsg: string
}

interface LoginProps {
    setUser: typeof setUser
}


class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        errorMsg: ''
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const loginRequest = {
            email: data.get('email'),
            password: data.get('password')
        }
        const rememberMe = (data.get('remember') === 'remember');

        axios.post(
            process.env.REACT_APP_PLATFORM_PATH + '/users/auth',
            loginRequest)
            .then(response => {
                this.setState({
                    errorMsg: ''
                })

                this.props.setUser(response.data.user);

                const cookies = new Cookies();
                let expires = response.data.session.expires;
                if (!rememberMe) {
                    expires = null;
                } else {
                    cookies.set('sessionId', response.data.session.id);
                }

            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.setState({
                        errorMsg: 'Username or password invalid'
                    })
                }
               console.log(error);
            });
    }

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={this.state.errorMsg !== ''}
                            helperText={this.state.errorMsg}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={this.state.errorMsg !== ''}
                            helperText={this.state.errorMsg}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    name="remember"
                                    color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default connect(null, { setUser })(Login)
