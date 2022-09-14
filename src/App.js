import React from 'react';
import Button from '@mui/material/Button';
import {Container} from '@mui/material';
import {Link} from 'react-router-dom';

function App() {
    return (
        <Container maxWidth="sm">
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
            <Link to="/users/signup"><Button variant="contained">Hello World</Button></Link>
        </Container>
    );
}

export default App;
