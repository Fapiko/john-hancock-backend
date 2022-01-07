import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Link as RouterLink, Route, Routes} from "react-router-dom";
import { SignUp } from "./components/signup";
import {CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import Login from "./components/login";
import {Provider} from "react-redux";
import store from './redux/store';
import Navbar from "./components/navbar";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <BrowserRouter>
                  <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                  <CssBaseline />
                  <Navbar />

                  <Routes>
                      <Route path="/" element={<App />} />
                      <Route path='users/login' element={<Login />} />
                      <Route path="users/signup" element={<SignUp />} />
                  </Routes>
              </BrowserRouter>
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
