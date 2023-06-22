import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {CssBaseline, GlobalStyles, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import Login from './components/login';
import {Provider} from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import Signup from './components/signup';
import {GoogleOAuthProvider} from '@react-oauth/google';
import CertAuthorities from './components/certificate-authorities/CertAuthorities';
import {ROUTE_CA_HOME, ROUTE_CA_NEW} from './consts/routes';
import NewCertAuthority from './components/certificate-authorities/NewCertAuthority';
import CertAuthority from './components/certificate-authorities/CertAuthority';
import Home from "./components/Home";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider
        clientId="834953141481-an55r41f085lol5fknij3rp5g9e8ho19.apps.googleusercontent.com">
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
                    <CssBaseline/>
                    <Navbar/>

                    <Routes>
                        <Route path="/" element={<App/>}>
                            <Route path="" element={<Home/>}/>
                            <Route path={ROUTE_CA_HOME} element={<CertAuthorities/>}/>
                            <Route path={ROUTE_CA_NEW} element={<NewCertAuthority/>}/>
                            <Route path={ROUTE_CA_NEW + '/:id'} element={<NewCertAuthority/>}/>
                            <Route path={ROUTE_CA_HOME + '/:id'} element={<CertAuthority/>}/>
                            <Route path="users/login" element={<Login/>}/>
                            <Route path="users/signup" element={<Signup/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </GoogleOAuthProvider>,
);
