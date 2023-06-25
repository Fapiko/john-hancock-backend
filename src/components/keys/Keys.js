import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { ROUTE_KEY_NEW } from '../../consts/routes';
import { Link } from 'react-router-dom';
import authenticatedDownload from '../../utils/authenticatedDownload';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Keys = () => {
	const [keys, setKeys] = useState([]);
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
				setKeys(response.data);
			});
	}, [sessionData]);

	const handleDownload = (keyId, format) => {
		const session = JSON.parse(sessionData);

		const path =
			process.env.REACT_APP_PLATFORM_PATH +
			'/keys/' +
			keyId +
			'/download?format=' +
			format;

		authenticatedDownload(path, session.id);
	};

	return (
		<>
			<h1>Keys</h1>
			<ul>
				{keys.map((key) => (
					<li key={key.id}>
						<Grid container>
							<Grid
								sx={{
									display: 'flex',
									alignItems: 'center',
								}}
								item
								xs={8}
							>
								<Typography alignItems={'center'}>
									{key.name}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Button
									sx={{ margin: 1 }}
									onClick={() =>
										handleDownload(key.id, 'pem')
									}
									variant="contained"
								>
									Download PEM
								</Button>
							</Grid>
						</Grid>
					</li>
				))}
			</ul>
			<Link to={ROUTE_KEY_NEW}>
				<Button variant="contained">Create</Button>
			</Link>
		</>
	);
};

export default Keys;
