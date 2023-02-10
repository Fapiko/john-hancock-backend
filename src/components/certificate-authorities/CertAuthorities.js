import {Button, Container} from '@mui/material';
import {ROUTE_CA_NEW} from '../../consts/routes';
import {Link} from 'react-router-dom';

const CertAuthorities = () => {
    return (
        <Container component="main">
            <h1>CertAuthorities</h1>
            <Link to={ROUTE_CA_NEW}><Button variant="contained">Create</Button></Link>
        </Container>
    )
}

export default CertAuthorities;
