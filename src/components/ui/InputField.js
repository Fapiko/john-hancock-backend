import TextField from '@mui/material/TextField';
import * as React from 'react';

const InputField = (props) => {
    return (
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
            onChange={props.onChange}
        />
    );
}

export default InputField;
