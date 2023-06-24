import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Card, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import InputField from '../ui/InputField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_CA_HOME } from '../../consts/routes';
import SelectField from '../ui/SelectField';
import Typography from '@mui/material/Typography';

const NewCertAuthority = () => {
	var navigate = useNavigate();
	const [key, setKey] = useState();
	const [keys, setKeys] = useState([]);
	const [state, setState] = useState('');
	const [locality, setLocality] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [streetAddress, setStreetAddress] = useState('');
	const [country, setCountry] = useState('');
	const [organization, setOrganization] = useState('');
	const [expiration, setExpiration] = useState(moment().add(1, 'year'));
	const sessionData = localStorage.getItem('session');
	let { id } = useParams();

	const header = (
		<h1>Create {id ? 'Intermediate' : 'Root'} Certificate Authority</h1>
	);

	useEffect(() => {
		const session = JSON.parse(sessionData);

		axios
			.get(process.env.REACT_APP_PLATFORM_PATH + '/keys', {
				headers: {
					Authorization: session.id,
				},
			})
			.then((response) => {
				let keyMap = {};
				response.data.forEach((key) => {
					keyMap[key.id] = key.name;
				});

				setKeys(keyMap);
			});

		if (id) {
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
					const ca = response.data;
					setOrganization(ca.issuer.organization[0]);
					setCountry(ca.issuer.country[0]);
					setLocality(ca.issuer.locality[0]);
					setPostalCode(ca.issuer.postalCode[0]);
					setStreetAddress(ca.issuer.streetAddress[0]);
					setState(ca.issuer.province[0]);
					setExpiration(moment(response.data.created).add(1, 'year'));
				});
		}
	}, [id, sessionData]);

	const handleSubmit = (event) => {
		const session = JSON.parse(sessionData);

		console.log(key);
		event.preventDefault();
		axios
			.put(
				process.env.REACT_APP_PLATFORM_PATH +
					'/certificate-authorities',
				{
					name: event.target.name.value,
					organization: event.target.organization.value,
					country: event.target.country.value,
					state: event.target.state.value,
					locality: event.target.locality.value,
					postalCode: event.target.postalCode.value,
					streetAddress: event.target.streetAddress.value,
					expiration: expiration.toISOString(),
					parentCA: id,
					key: key,
					keyPassword: event.target.keyPassword.value,
					parentKeyPassword: event.target.parentKeyPassword.value,
				},
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then((response) => {
				navigate(ROUTE_CA_HOME);
			});
	};

	const handleExpirationChange = (newValue) => {
		setExpiration(newValue);
	};

	let parentFields = (
		<Card sx={{ padding: 1 }}>
			<Typography variant={'overline'}>
				Parent Certificate Authority Private Key
			</Typography>
			<InputField
				id="parentKeyPassword"
				label="Parent Key Password"
				type="password"
			/>
		</Card>
	);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			{header}
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit}
				sx={{ mt: 3 }}
			>
				<Stack spacing={2}>
					<InputField
						required
						id="name"
						label="Certificate Authority Name"
					/>
					{parentFields}
					<Card sx={{ padding: 1 }}>
						<Typography variant={'overline'}>
							Private Key
						</Typography>
						<SelectField
							id="key"
							label="Key"
							value={key}
							options={keys}
							onChange={setKey}
						/>
						<InputField
							id={'keyPassword'}
							label={'Key Password'}
							type={'password'}
						/>
					</Card>
					<InputField
						required
						id="organization"
						label="Organization"
						value={organization}
						onChange={(event) =>
							setOrganization(event.target.value)
						}
					/>
					<InputField
						id="country"
						label="Country or Region"
						value={country}
						onChange={(event) => setCountry(event.target.value)}
					/>
					<InputField
						id="state"
						label="State or Province"
						value={state}
						onChange={(event) => setState(event.target.value)}
					/>
					<InputField
						id="locality"
						label="Locality"
						value={locality}
						onChange={(event) => setLocality(event.target.value)}
					/>
					<InputField
						id="postalCode"
						label="Postal Code"
						value={postalCode}
						onChange={(event) => setPostalCode(event.target.value)}
					/>
					<InputField
						id="streetAddress"
						label="Street Address"
						value={streetAddress}
						onChange={(event) =>
							setStreetAddress(event.target.value)
						}
					/>
					<DesktopDatePicker
						onChange={handleExpirationChange}
						value={expiration}
						renderInput={(params) => <TextField {...params} />}
					/>
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create
					</Button>
				</Stack>
			</Box>
		</LocalizationProvider>
	);
};

export default NewCertAuthority;
