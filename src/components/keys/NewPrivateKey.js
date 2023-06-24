import * as React from 'react';
import { useEffect, useState } from 'react';
import InputField from '../ui/InputField';
import axios from 'axios';
import { ROUTE_KEYS } from '../../consts/routes';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SelectField from '../ui/SelectField';

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
		console.log(keyAlgorithm);

		e.preventDefault();
		axios
			.put(
				process.env.REACT_APP_PLATFORM_PATH + '/keys',
				{
					name: e.target.name.value,
					algorithm: parseInt(keyAlgorithm),
					password: e.target.password.value,
				},
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then((response) => {
				navigate(ROUTE_KEYS);
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
				<SelectField
					label={'Key Algorithm'}
					id={'keyAlgorithm'}
					value={keyAlgorithm}
					onChange={setKeyAlgorithm}
					options={keyAlgorithms}
				/>
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
