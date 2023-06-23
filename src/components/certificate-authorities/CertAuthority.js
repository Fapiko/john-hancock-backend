import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { ROUTE_CA_NEW, ROUTE_CERT_NEW } from '../../consts/routes';
import { Button } from '@mui/material';

const CertAuthority = () => {
	const [certAuthority, setCertAuthority] = useState({});

	let { id } = useParams();
	const sessionData = localStorage.getItem('session');

	useEffect(() => {
		const session = JSON.parse(sessionData);

		axios
			.get(
				process.env.REACT_APP_PLATFORM_PATH +
					'/certificate-authorities/' +
					id,
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then((response) => {
				setCertAuthority(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id, sessionData]);

	const issuer = certAuthority.issuer;
	const created = moment(new Date(certAuthority.created)).format(
		'MMMM Do YYYY, h:mm:ss a'
	);

	if (!certAuthority.issuer) {
		return (
			<div>
				<h1>Not found</h1>
			</div>
		);
	}

	return (
		<div>
			<h1>{certAuthority.name}</h1>
			<ul>
				<li>{created}</li>
				<li>CA Cert: {'' + certAuthority.isCA}</li>
				<li>
					Issuer:
					<ul>
						<li>
							Country:{' '}
							{issuer.country.map((v) => (
								<span key={v}>{v}</span>
							))}
						</li>
						<li>
							Organization:{' '}
							{issuer.organization.map((v) => (
								<span key={v}>{v}</span>
							))}
						</li>
						<li>
							Locality:{' '}
							{issuer.locality.map((v) => (
								<span key={v}>{v}</span>
							))}
						</li>
						<li>
							Postal Code:{' '}
							{issuer.postalCode.map((v) => (
								<span key={v}>{v}</span>
							))}
						</li>
						<li>
							Province:{' '}
							{issuer.province.map((v) => (
								<span key={v}>{v}</span>
							))}
						</li>
						<li>
							Street Address:{' '}
							{issuer.streetAddress.map((v) => (
								<span key={v}>{v}</span>
							))}
						</li>
					</ul>
				</li>
			</ul>
			<div>
				<span>
					<Link to={ROUTE_CA_NEW + '/' + certAuthority.id}>
						<Button variant="contained">
							Create Intermediate CA
						</Button>
					</Link>
				</span>
				<span>
					<Link to={ROUTE_CERT_NEW + '/' + certAuthority.id}>
						<Button variant="contained">Create Certificate</Button>
					</Link>
				</span>
			</div>
		</div>
	);
};

export default CertAuthority;
