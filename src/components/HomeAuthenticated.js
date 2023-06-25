import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_CA_HOME, ROUTE_KEYS } from '../consts/routes';

const HomeAuthenticated = (props) => {
	return (
		<>
			<Button
				sx={{ m: 1 }}
				variant="contained"
				color="primary"
				component={RouterLink}
				to={ROUTE_CA_HOME}
			>
				View CAs
			</Button>
			<Button
				variant="contained"
				color="primary"
				component={RouterLink}
				to={ROUTE_KEYS}
			>
				View Keys
			</Button>
		</>
	);
};

export default HomeAuthenticated;
