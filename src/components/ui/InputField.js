import TextField from '@mui/material/TextField';
import * as React from 'react';
import { FormControl, InputLabel } from '@mui/material';

const InputField = (props) => {
	return (
		<FormControl fullWidth margin={'normal'}>
			<InputLabel id={props.id + '-label'}>{props.name}</InputLabel>
			<TextField
				required={props.required}
				fullWidth
				id={props.id}
				error={false}
				helperText=""
				label={props.label}
				name={props.id}
				autoComplete={props.id}
				value={props.value}
				onChange={props.onChange ? props.onChange : () => {}}
				type={props.type ? props.type : 'text'}
			/>
		</FormControl>
	);
};

export default InputField;
