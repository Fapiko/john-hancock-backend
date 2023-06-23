import { Autocomplete, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

const certTypes = [
	{
		id: 'any',
		label: 'Any',
	},
	{
		id: 'digitalSignature',
		label: 'Digital Signature',
	},
	{
		id: 'contentCommitment',
		label: 'Content Commitment (Non-Repudiation)',
	},
	{
		id: 'keyEncipherment',
		label: 'Key Encipherment',
	},
	{
		id: 'keyAgreement',
		label: 'Key Agreement',
	},
	{
		id: 'certSign',
		label: 'Certificate Signing',
	},
	{
		id: 'crlSign',
		label: 'Certificate Revokation List Signing',
	},
	{
		id: 'encipherOnly',
		label: 'Encipher Only',
	},
	{
		id: 'decipherOnly',
		label: 'Decipher Only',
	},
	{
		id: 'serverAuth',
		label: 'Server Auth',
	},
	{
		id: 'clientAuth',
		label: 'Client Auth',
	},
	{
		id: 'codeSigning',
		label: 'Code Signing',
	},
	{
		id: 'emailProtection',
		label: 'Email Protection',
	},
	{
		id: 'timeStamping',
		label: 'Time Stamping',
	},
	{
		id: 'ocspSigning',
		label: 'OCSP Signing',
	},
];

const NewCertificate = () => {
	// TODO: Validate key usages on change

	return (
		<div>
			<h1>New Certificate</h1>
			<FormControl fullWidth margin={'normal'}>
				<Autocomplete
					multiple
					labelId={'keyUsages-label'}
					id={'keyUsages'}
					options={certTypes}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="standard"
							label="Key Usages"
							placeholder="Key Usages"
						/>
					)}
				/>
			</FormControl>
		</div>
	);
};

export default NewCertificate;
