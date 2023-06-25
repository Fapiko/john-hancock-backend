import { Button, Container } from '@mui/material';
import { ROUTE_CA_NEW } from '../../consts/routes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CertAuthorities = () => {
	const [certAuthorities, setCertAuthorities] = useState([]);
	const sessionData = localStorage.getItem('session');

	useEffect(() => {
		const session = JSON.parse(sessionData);

		axios
			.get(
				process.env.REACT_APP_PLATFORM_PATH +
					'/certificate-authorities',
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then((response) => {
				setCertAuthorities(response.data);
			});
	}, [sessionData]);

	return (
		<Container component="main">
			<h1>Certificate Authorities</h1>
			<ul>
				{certAuthorities.map((certAuthority) => (
					<li key={certAuthority.id}>
						<Link
							to={'/certificate-authorities/' + certAuthority.id}
						>
							{certAuthority.name}
						</Link>
					</li>
				))}
			</ul>
			<Link to={ROUTE_CA_NEW}>
				<Button variant="contained">Create</Button>
			</Link>
		</Container>
	);
};

export default CertAuthorities;
