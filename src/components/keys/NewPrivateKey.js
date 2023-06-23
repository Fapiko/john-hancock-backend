import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import InputField from '../ui/InputField';
import axios from 'axios';
import { ROUTE_CA_HOME } from '../../consts/routes';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const NewPrivateKey = () => {
	var navigate = useNavigate();
	const [keyAlgorithms, setKeyAlgorithms] = useState({ 0: '' });
	const [keyAlgorithm, setKeyAlgorithm] = useState(0);
	const sessionData = localStorage.getItem('session');

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_PLATFORM_PATH + '/keys/types')
			.then((res) => {
				setKeyAlgorithms(res.data);
			});
	}, [setKeyAlgorithms]);

	const handleSubmit = (e) => {
		const session = JSON.parse(sessionData);

		e.preventDefault();
		axios
			.put(
				process.env.REACT_APP_PLATFORM_PATH + '/keys',
				{
					name: e.target.name.value,
					algorithm: parseInt(keyAlgorithm),
					passowrd: e.target.password.value,
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

	return (
		<div>
			<h1>Create a Private Key</h1>
			<form onSubmit={handleSubmit}>
				<InputField
					label={'Name'}
					id={'name'}
					type={'text'}
					placeholder={'Name'}
				/>
				<FormControl fullWidth>
					<InputLabel id={'select-key-algorithm-label'}>
						Key Algorithm
					</InputLabel>
					<Select
						labelId={'select-key-algorithm-label'}
						id={'select-key-algorithm'}
						value={keyAlgorithm}
						label={'Key Algorithm'}
						onChange={(e) => setKeyAlgorithm(e.target.value)}
					>
						{Object.keys(keyAlgorithms).map((keyName) => (
							<MenuItem key={keyName} value={keyName}>
								{keyAlgorithms[keyName]}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<InputField
					label={'Password'}
					type={'password'}
					id={'password'}
				/>
				<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
					Create
				</Button>
			</form>
		</div>
	);
};

export default NewPrivateKey;
