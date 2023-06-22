import * as React from 'react';
import {useEffect} from 'react';
import {Box, Stack} from '@mui/material';
import Button from '@mui/material/Button';
import InputField from '../ui/InputField';
import {DesktopDatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_CA_HOME} from "../../consts/routes";

const NewCertAuthority = () => {
    var navigate = useNavigate();
    const [state, setState] = React.useState('');
    const [locality, setLocality] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [streetAddress, setStreetAddress] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [organization, setOrganization] = React.useState('');
    const [expiration, setExpiration] = React.useState(moment().add(1, 'year'));
    const sessionData = localStorage.getItem('session');
    let {id} = useParams();

    const header = <h1>Create {id ? 'Intermediate' : 'Root'} Certificate Authority</h1>;

    useEffect(() => {
        if (id) {
            axios.get(process.env.REACT_APP_PLATFORM_PATH + '/certificate-authorities/' + id, {
                headers: {
                    Authorization: JSON.parse(sessionData).id,
                }
            }).then((response) => {
                const ca = response.data;
                setOrganization(ca.issuer.organization[0])
                setCountry(ca.issuer.country[0])
                setLocality(ca.issuer.locality[0])
                setPostalCode(ca.issuer.postalCode[0])
                setStreetAddress(ca.issuer.streetAddress[0])
                setState(ca.issuer.province[0])
                setExpiration(moment(response.data.created).add(1, 'year'));
            })
        }
    }, [id, sessionData]);

    const handleSubmit = (event) => {
        const session = JSON.parse(sessionData);

        event.preventDefault();
        axios.put(process.env.REACT_APP_PLATFORM_PATH + '/certificate-authorities', {
            name: event.target.name.value,
            organization: event.target.organization.value,
            country: event.target.country.value,
            state: event.target.state.value,
            locality: event.target.locality.value,
            postalCode: event.target.postalCode.value,
            streetAddress: event.target.streetAddress.value,
            expiration: expiration.toISOString(),
            parentCA: id,
        }, {
            headers: {
                Authorization: session.id,
            }
        }).then((response) => {
            navigate(ROUTE_CA_HOME);
        });
    }

    const handleExpirationChange = (newValue) => {
        setExpiration(newValue);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            {header}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                <Stack spacing={2}>
                    <InputField required
                                id="name"
                                label="Certificate Authority Name"/>
                    <InputField required id="organization" label="Organization"
                                value={organization}
                                onChange={(event) => setOrganization(event.target.value)}/>
                    <InputField id="country" label="Country or Region"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}/>
                    <InputField id="state" label="State or Province"
                                value={state}
                                onChange={(event) => setState(event.target.value)}/>
                    <InputField id="locality" label="Locality"
                                value={locality}
                                onChange={(event) => setLocality(event.target.value)}
                    />
                    <InputField id="postalCode" label="Postal Code"
                                value={postalCode}
                                onChange={(event) => setPostalCode(event.target.value)}
                    />
                    <InputField id="streetAddress" label="Street Address"
                                value={streetAddress}
                                onChange={(event) => setStreetAddress(event.target.value)}
                    />
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

export default NewCertAuthority;