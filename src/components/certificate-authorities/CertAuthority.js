import * as React from 'react';
import {Box, Stack} from '@mui/material';
import Button from '@mui/material/Button';
import InputField from '../ui/InputField';
import {DesktopDatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import axios from "axios";

const CertAuthority = () => {
    const [expiration, setExpiration] = React.useState(moment().add(1, 'year'));
    const sessionData = localStorage.getItem('session');

    const handleSubmit = (event) => {
        const session = JSON.parse(sessionData);

        event.preventDefault();
        console.log(event);
        axios.put(process.env.REACT_APP_PLATFORM_PATH + '/certificate-authorities', {
            name: event.target.name.value,
            organization: event.target.organization.value,
            country: event.target.country.value,
            state: event.target.state.value,
            city: event.target.city.value,
            postalCode: event.target.postalCode.value,
            streetAddress: event.target.streetAddress.value,
            expiration: expiration.toISOString(),
        }, {
            headers: {
                Authorization: session.id,
            }
        })
    }

    const handleExpirationChange = (newValue) => {
        setExpiration(newValue);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                <Stack spacing={2}>
                    <InputField required
                                id="name"
                                label="Certificate Authority Name"/>
                    <InputField required id="organization" label="Organization"/>
                    <InputField id="country" label="Country or Region"/>
                    <InputField id="state" label="State or Province"/>
                    <InputField id="city" label="Locality"/>
                    <InputField id="postalCode" label="Postal Code"/>
                    <InputField id="streetAddress" label="Street Address"/>
                    <DesktopDatePicker onChange={handleExpirationChange} value={expiration}
                                       renderInput={(params) => <TextField {...params} />}/>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Create
                    </Button>
                </Stack>
            </Box>
        </LocalizationProvider>
    )
}

export default CertAuthority;