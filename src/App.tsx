import React from 'react';
// import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import {Container} from '@mui/material';
import {
    BrowserRouter,
    Route,
    Link
} from "react-router-dom";
// import './App.css';

function App() {
  return (
          <Container maxWidth="sm">
              <meta name="viewport" content="initial-scale=1, width=device-width" />
              <Link to="/users/create"><Button variant="contained">Hello World</Button></Link>
          </Container>
  );
}

export default App;
// ReactDOM.render(<App />, document.querySelector('#app'));