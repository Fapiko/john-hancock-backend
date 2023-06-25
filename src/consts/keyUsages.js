export const keyUsageValues = [
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

export function keyUsageFromId(id) {
	return keyUsageValues.find((keyUsage) => keyUsage.id === id);
}
