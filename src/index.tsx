import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Link as RouterLink, Route, Routes} from "react-router-dom";
import { SignUp } from "./routes/signup";
import {AppBar, CssBaseline, GlobalStyles, ThemeProvider, Toolbar} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {Login} from "./routes/login";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
              <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
              <CssBaseline />
              <AppBar position="static"
                      color="default"
                      elevation={0}
                      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                  <Toolbar sx={{ flexWrap: 'wrap' }}>
                      <Link component={RouterLink} underline="none" color="text.primary" to="/" noWrap sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" color="inherit" >
                              John Hancock
                          </Typography>
                      </Link>
                      <nav>
                          <Button
                              variant="outlined"
                              component={RouterLink}
                              to="/users/login"
                              sx={{ my: 1, mx: 1.5 }}
                          >
                              Login
                          </Button>
                          <Button
                              component={RouterLink}
                              variant="outlined"
                                to="/users/signup"
                                sx={{ my: 1, mx: 1.5 }}>
                              Sign up
                          </Button>
                      </nav>
                  </Toolbar>
              </AppBar>

              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path='users/login' element={<Login />} />
                  <Route path="users/signup" element={<SignUp />} />
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
