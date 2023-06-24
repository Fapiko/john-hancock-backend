import Typography from '@mui/material/Typography';
import SelectField from './SelectField';
import InputField from './InputField';
import { Card } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const PrivateKeySelector = (props) => {
	const [keys, setKeys] = React.useState({});
	const sessionData = localStorage.getItem('session');

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
	}, [setKeys, sessionData]);

	return (
		<Card sx={{ padding: 1 }}>
			<Typography variant={'overline'}>
				{props.name ? props.name : 'Private Key'}
			</Typography>
			<SelectField
				id="key"
				label="Key"
				value={props.key}
				options={keys}
				onChange={props.onChange}
			/>
			<InputField
				id={'keyPassword'}
				label={'Key Password'}
				type={'password'}
			/>
		</Card>
	);
};

export default PrivateKeySelector;
