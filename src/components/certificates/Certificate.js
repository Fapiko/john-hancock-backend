import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import authenticatedDownload from '../../utils/authenticatedDownload';

const Certificate = () => {
	const [certificate, setCertificate] = useState({});
	const sessionData = localStorage.getItem('session');
	let { caId, certId } = useParams();
	const session = JSON.parse(sessionData);

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_PLATFORM_PATH +
					'/certificate-authorities/' +
					caId +
					'/certificates/' +
					certId,
				{
					headers: {
						Authorization: session.id,
					},
				}
			)
			.then((response) => {
				setCertificate(response.data);
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
			'/download';

		authenticatedDownload(path, session.id);
	};

	return (
		<div>
			<h1>{certificate.name} Certificate</h1>
			<Button onClick={() => handleDownload('pem')} variant="contained">
				Download PEM
			</Button>
		</div>
	);
};

export default Certificate;
