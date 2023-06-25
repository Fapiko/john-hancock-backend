import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import authenticatedDownload from '../../utils/authenticatedDownload';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { ROUTE_CA_HOME } from '../../consts/routes';
import { keyUsageFromId } from '../../consts/keyUsages';

const Certificate = () => {
	const [open, setOpen] = useState(false);
	const [certificate, setCertificate] = useState({});
	const sessionData = localStorage.getItem('session');
	let { caId, certId } = useParams();
	const navigate = useNavigate();
	const session = JSON.parse(sessionData);

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_PLATFORM_PATH + '/certificates/' + certId,
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then((response) => {
				const cert = response.data;
				setCertificate(cert);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [certId, caId, session.id]);

	const handleDownload = (format) => {
		const session = JSON.parse(sessionData);

		const path =
			process.env.REACT_APP_PLATFORM_PATH +
			'/certificates/' +
			certId +
			'/download?format=' +
			format;

		authenticatedDownload(path, session.id);
	};

	const handleDelete = () => {
		const path =
			process.env.REACT_APP_PLATFORM_PATH + '/certificates/' + certId;
		axios
			.delete(path, {
				headers: {
					Authorization: session.id,
				},
			})
			.then(() => {
				navigate(ROUTE_CA_HOME + '/' + caId);
			})
			.catch((error) => {
				console.log(error);
			});

		setOpen(false);
	};

	const keyUsageItems = [];
	certificate.keyUsage &&
		certificate.keyUsage.forEach((keyUsage) => {
			keyUsageItems.push(
				<li key={keyUsage}>{keyUsageFromId(keyUsage).label}</li>
			);
		});

	const extKeyUsageItems = [];
	certificate.extKeyUsage &&
		certificate.extKeyUsage.forEach((keyUsage) => {
			extKeyUsageItems.push(
				<li key={keyUsage}>{keyUsageFromId(keyUsage).label}</li>
			);
		});

	const subjectAlternativeNames = [];
	certificate.sanDNSNames &&
		certificate.sanDNSNames.forEach((name) => {
			subjectAlternativeNames.push(<li key={name}>{name}</li>);
		});

	return (
		<div>
			<h1>{certificate.name} Certificate</h1>
			<h3>Key Usage</h3>
			<ul>{keyUsageItems}</ul>
			<h3>Extended Key Usage</h3>
			<ul>{extKeyUsageItems}</ul>
			<h3>Subject Alternative Names</h3>
			<ul>{subjectAlternativeNames}</ul>
			<Button onClick={() => handleDownload('pem')} variant="contained">
				Download PEM
			</Button>
			<Button
				sx={{ backgroundColor: 'red', margin: 1 }}
				onClick={() => setOpen(true)}
				variant="contained"
			>
				Delete Certificate
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Delete Certificate {certificate.name}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Click OK to confirm you want to delete the{' '}
						<strong>{certificate.name}</strong> certificate.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						variant={'contained'}
						onClick={handleDelete}
						sx={{ backgroundColor: 'red' }}
					>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Certificate;
