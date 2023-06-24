import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const SelectField = (props) => {
	const [value, setValue] = useState('');

	const onChangeValue = (value) => {
		setValue(value);
		props.onChange(value);
	};

	return (
		<FormControl fullWidth>
			<InputLabel id={props.id + '-label'}>{props.label}</InputLabel>
			<Select
				required={props.required}
				labelId={props.id + '-label'}
				id={props.id}
				value={value}
				label={props.label}
				onChange={(e) => onChangeValue(e.target.value)}
			>
				{Object.keys(props.options).map((key) => (
					<MenuItem key={key} value={key}>
						{props.options[key]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectField;
