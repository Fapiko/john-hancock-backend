import { Autocomplete, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputField from '../ui/InputField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ROUTE_CA_HOME } from '../../consts/routes';
import PrivateKeySelector from '../ui/PrivateKeySelector';
import * as React from 'react';
import { useState } from 'react';
import moment from 'moment/moment';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const certTypes = [
	{
		id: 'any',
		label: 'Any',
	},
	{
		id: 'digitalSignature',
		label: 'Digital Signature',
	},
	{
		id: 'contentCommitment',
		label: 'Content Commitment (Non-Repudiation)',
	},
	{
		id: 'keyEncipherment',
		label: 'Key Encipherment',
	},
	{
		id: 'keyAgreement',
		label: 'Key Agreement',
	},
	{
		id: 'certSign',
		label: 'Certificate Signing',
	},
	{
		id: 'crlSign',
		label: 'Certificate Revokation List Signing',
	},
	{
		id: 'encipherOnly',
		label: 'Encipher Only',
	},
	{
		id: 'decipherOnly',
		label: 'Decipher Only',
	},
	{
		id: 'serverAuth',
		label: 'Server Auth',
	},
	{
		id: 'clientAuth',
		label: 'Client Auth',
	},
	{
		id: 'codeSigning',
		label: 'Code Signing',
	},
	{
		id: 'emailProtection',
		label: 'Email Protection',
	},
	{
		id: 'timeStamping',
		label: 'Time Stamping',
	},
	{
		id: 'ocspSigning',
		label: 'OCSP Signing',
	},
];

const NewCertificate = () => {
	const [key, setKey] = useState('');
	const [keyUsages, setKeyUsages] = useState([]);
	const [expiration, setExpiration] = useState(moment().add(1, 'year'));
	const sessionData = localStorage.getItem('session');
	var navigate = useNavigate();
	let { caId } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.keyUsages.value);

		const session = JSON.parse(sessionData);
		axios
			.put(
				process.env.REACT_APP_PLATFORM_PATH +
					'/certificate-authorities/' +
					caId,
				{
					name: e.target.name.value,
					keyId: key,
					keyPassword: e.target.keyPassword.value,
					caKeyPassword: e.target.caKeyPassword.value,
					keyUsages: keyUsages,
					commonName: e.target.commonName.value,
					san: e.target.san.value,
					expiration: expiration,
				},
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then(() => {
				navigate(ROUTE_CA_HOME);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<h1>New Certificate</h1>
			<form onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<InputField
						required
						label={'Name'}
						id={'name'}
						placeholder={'Name'}
					/>
					<PrivateKeySelector
						name={'Certificate Private Key'}
						onChange={setKey}
					/>
					<InputField
						label={'CA Key Password'}
						id={'caKeyPassword'}
					/>
					<Autocomplete
						multiple
						label={'Key Usages'}
						id={'keyUsages'}
						options={certTypes}
						isOptionEqualToValue={(option, value) =>
							option.id === value.id
						}
						onChange={(event, newValue) => {
							setKeyUsages(newValue.map((v) => v.id));
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="standard"
								label="Key Usages"
								placeholder="Key Usages"
							/>
						)}
					/>
					<InputField
						required
						label={'Common Name'}
						id={'commonName'}
						placeholder={'Common Name'}
					/>
					<Autocomplete
						multiple
						id={'san'}
						freeSolo
						options={[]}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="standard"
								label="Subject Alternative Names"
								placeholder=""
							/>
						)}
					/>
					<DesktopDatePicker
						onChange={setExpiration}
						value={expiration}
						renderInput={(params) => <TextField {...params} />}
					/>
				</Stack>
				<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
					Create
				</Button>
			</form>
		</div>
	);
};

export default NewCertificate;
