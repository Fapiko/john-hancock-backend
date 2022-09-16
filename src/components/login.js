import 'react-toastify/dist/ReactToastify.css';
import {GoogleLogin} from '@react-oauth/google';
import {Box, Container} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {validateOauthToken} from '../store/actions/user-actions';

const Login = (props) => {
    const session  = useSelector(state => state.user.session);
    const dispatch = useDispatch();

    const loginSuccess = (response) => {
        dispatch(validateOauthToken(response.credential));
    }

    const loginFailure = (response) => {
        console.log(response);
    }

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
                {!session &&
                <GoogleLogin onSuccess={loginSuccess} onError={loginFailure} useOneTap/>}
            </Box>
        </Container>
    )


    // const [state, setState] = useState(initialState);
    //
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //
    //     const data = new FormData(event.currentTarget);
    //
    //     const loginRequest = {
    //         email:    data.get('email'),
    //         password: data.get('password'),
    //     }
    //     const rememberMe   = (data.get('remember') === 'remember');
    //
    //     axios.post(
    //         process.env.REACT_APP_PLATFORM_PATH + '/users/auth',
    //         loginRequest)
    //         .then(response => {
    //             setState({
    //                 errorMsg: '',
    //             })
    //
    //             props.setUser(response.data.user);
    //
    //             const cookies = new Cookies();
    //             let expires   = response.data.session.expires;
    //             if (!rememberMe) {
    //                 expires = null;
    //             } else {
    //                 cookies.set('sessionId', response.data.session.id);
    //             }
    //
    //         })
    //         .catch(error => {
    //             if (error.response !== undefined && error.response.status === 401) {
    //                 setState({
    //                     errorMsg: 'Username or password invalid',
    //                 })
    //             } else {
    //                 toast.error('Error occurred', {autoClose: false});
    //             }
    //             console.log(error);
    //         });
    // }
    // return (
    //     <Container component="main" maxWidth="xs">
    //         <Box
    //             sx={{
    //                 marginTop:     8,
    //                 display:       'flex',
    //                 flexDirection: 'column',
    //                 alignItems:    'center',
    //             }}
    //         >
    //             <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
    //                 <LockOutlinedIcon/>
    //             </Avatar>
    //             <Typography component="h1" variant="h5">
    //                 Sign in
    //             </Typography>
    //             <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
    //                 <TextField
    //                     margin="normal"
    //                     required
    //                     fullWidth
    //                     id="email"
    //                     label="Email Address"
    //                     name="email"
    //                     autoComplete="email"
    //                     autoFocus
    //                     error={state.errorMsg !== ''}
    //                     helperText={state.errorMsg}
    //                 />
    //                 <TextField
    //                     margin="normal"
    //                     required
    //                     fullWidth
    //                     name="password"
    //                     label="Password"
    //                     type="password"
    //                     id="password"
    //                     autoComplete="current-password"
    //                     error={state.errorMsg !== ''}
    //                     helperText={state.errorMsg}
    //                 />
    //                 <FormControlLabel
    //                     control={
    //                         <Checkbox
    //                             value="remember"
    //                             name="remember"
    //                             color="primary"/>
    //                     }
    //                     label="Remember me"
    //                 />
    //                 <Button
    //                     type="submit"
    //                     fullWidth
    //                     variant="contained"
    //                     sx={{mt: 3, mb: 2}}
    //                 >
    //                     Sign In
    //                 </Button>
    //                 <Grid container>
    //                     <Grid item xs>
    //                         <Link href="#" variant="body2">
    //                             Forgot password?
    //                         </Link>
    //                     </Grid>
    //                     <Grid item>
    //                         <Link href="#" variant="body2">
    //                             <>Don't have an account? Sign Up</>
    //                         </Link>
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Box>
    //         <ToastContainer/>
    //     </Container>
    // );
}

export default Login;
