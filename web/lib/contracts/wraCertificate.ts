// WRA Certificate NFT Contract Configuration
// Network: Sepolia Testnet (Chain ID: 11155111)

// ⚠️ IMPORTANT: Replace this address after deploying the contract
// Deploy guide: see /contracts/DEPLOY_GUIDE.md
export const WRA_CERT_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as const;

export const WRA_CERT_ABI = [
    // Read Functions
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'getCertificate',
        outputs: [
            { name: 'certType', type: 'string' },
            { name: 'recipientName', type: 'string' },
            { name: 'issuedAt', type: 'uint256' },
            { name: 'revoked', type: 'bool' },
            { name: 'owner_', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'holder', type: 'address' }],
        name: 'getHolderTokens',
        outputs: [{ name: '', type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalCertificates',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },

    // Write Functions
    {
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'tokenURI_', type: 'string' },
            { name: 'certType', type: 'string' },
            { name: 'recipientName', type: 'string' },
        ],
        name: 'issueCertificate',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'revokeCertificate',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },

    // Events
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'tokenId', type: 'uint256' },
            { indexed: true, name: 'recipient', type: 'address' },
            { indexed: false, name: 'certType', type: 'string' },
            { indexed: false, name: 'recipientName', type: 'string' },
        ],
        name: 'CertificateIssued',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'tokenId', type: 'uint256' },
        ],
        name: 'CertificateRevoked',
        type: 'event',
    },
] as const;

// Certificate Types
export const CERT_TYPES = [
    { value: 'K-Royal Warrant', label: 'K-Royal Warrant (왕립 인증)', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { value: 'K-Heritage Guide', label: 'K-Heritage Guide (문화유산 가이드)', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { value: 'Educator', label: 'Educator (교육자 인증)', color: 'text-green-400', bg: 'bg-green-500/10' },
    { value: 'Cultural Ambassador', label: 'Cultural Ambassador (문화대사)', color: 'text-purple-400', bg: 'bg-purple-500/10' },
] as const;

// Sepolia chain ID
export const CERT_CHAIN_ID = 11155111;
