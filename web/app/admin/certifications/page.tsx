'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Wallet, Send, CheckCircle, AlertCircle, Loader2, ExternalLink, Award, Hash, FileText, Eye } from 'lucide-react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WRA_CERT_CONTRACT_ADDRESS, WRA_CERT_ABI, CERT_TYPES, CERT_CHAIN_ID } from '@/lib/contracts/wraCertificate';
import CertificateTemplate from '@/components/certificate/CertificateTemplate';

export default function CertificationsPage() {
    const { address, isConnected, chain } = useAccount();
    const [recipientAddress, setRecipientAddress] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [certType, setCertType] = useState<string>(CERT_TYPES[0].value);
    const [tokenURI, setTokenURI] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const isContractDeployed = WRA_CERT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';
    const isCorrectChain = chain?.id === CERT_CHAIN_ID;

    // Read total certificates
    const { data: totalCerts } = useReadContract({
        address: WRA_CERT_CONTRACT_ADDRESS,
        abi: WRA_CERT_ABI,
        functionName: 'totalCertificates',
        chainId: CERT_CHAIN_ID,
        query: { enabled: isContractDeployed },
    });

    // Write: Issue Certificate
    const { writeContract, data: txHash, isPending: isMinting, error: mintError } = useWriteContract();

    // Wait for transaction receipt
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txHash,
    });

    function handleIssueCertificate() {
        if (!recipientAddress || !recipientName || !certType) return;

        const metadataURI = tokenURI || `data:application/json,${encodeURIComponent(JSON.stringify({
            name: `WRA Certificate - ${certType}`,
            description: `World Royal Academy ${certType} certificate issued to ${recipientName}`,
            image: 'https://wra.or.kr/images/logo.png',
            attributes: [
                { trait_type: 'Certificate Type', value: certType },
                { trait_type: 'Recipient', value: recipientName },
                { trait_type: 'Issued By', value: 'World Royal Academy' },
                { trait_type: 'Issue Date', value: new Date().toISOString().split('T')[0] },
            ],
        }))}`;

        writeContract({
            address: WRA_CERT_CONTRACT_ADDRESS,
            abi: WRA_CERT_ABI,
            functionName: 'issueCertificate',
            args: [recipientAddress as `0x${string}`, metadataURI, certType, recipientName],
            chainId: CERT_CHAIN_ID,
        });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Shield className="w-8 h-8 text-cyan-400" />
                        NFT 인증서 발급
                    </h1>
                    <p className="text-gray-400 mt-1">블록체인 기반 인증서를 NFT로 발급합니다 (Sepolia Testnet)</p>
                </div>
                <ConnectButton />
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Wallet Status */}
                <div className={`relative overflow-hidden rounded-xl border p-5 ${isConnected ? 'border-green-500/30 bg-green-500/5' : 'border-white/5 bg-[#0a0a1a]'}`}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-emerald-400" />
                    <div className="flex items-center gap-3 mb-2">
                        <Wallet className={`w-5 h-5 ${isConnected ? 'text-green-400' : 'text-gray-500'}`} />
                        <span className="text-sm text-gray-400">지갑 상태</span>
                    </div>
                    <p className={`text-lg font-bold ${isConnected ? 'text-green-400' : 'text-gray-500'}`}>
                        {isConnected ? '연결됨' : '미연결'}
                    </p>
                    {isConnected && (
                        <p className="text-xs text-gray-500 mt-1 font-mono truncate">{address}</p>
                    )}
                </div>

                {/* Network Status */}
                <div className={`relative overflow-hidden rounded-xl border p-5 ${isCorrectChain ? 'border-blue-500/30 bg-blue-500/5' : 'border-yellow-500/30 bg-yellow-500/5'}`}>
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <div className="flex items-center gap-3 mb-2">
                        <Hash className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-400">네트워크</span>
                    </div>
                    <p className={`text-lg font-bold ${isCorrectChain ? 'text-blue-400' : 'text-yellow-400'}`}>
                        {chain?.name || 'Not Connected'}
                    </p>
                    {!isCorrectChain && isConnected && (
                        <p className="text-xs text-yellow-400 mt-1">⚠️ Sepolia로 전환해주세요</p>
                    )}
                </div>

                {/* Total Certificates */}
                <div className="relative overflow-hidden rounded-xl border border-white/5 p-5 bg-[#0a0a1a]">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-violet-400" />
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-400">발급된 인증서</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                        {isContractDeployed ? (totalCerts?.toString() || '0') : '—'}
                    </p>
                </div>
            </div>

            {/* Contract Deployment Warning */}
            {!isContractDeployed && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-yellow-400 font-semibold text-sm">스마트 컨트랙트 미배포</p>
                        <p className="text-yellow-400/70 text-xs mt-1">
                            컨트랙트 주소가 설정되지 않았습니다. <code className="bg-white/5 px-1 rounded">contracts/DEPLOY_GUIDE.md</code>를 참고하여
                            Sepolia 테스트넷에 배포 후, <code className="bg-white/5 px-1 rounded">lib/contracts/wraCertificate.ts</code>의 주소를 업데이트해주세요.
                        </p>
                    </div>
                </div>
            )}

            {/* Issue Certificate Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]"
            >
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    인증서 발급 (NFT Minting)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Recipient Name */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">수령인 이름</label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="홍길동"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

                    {/* Certificate Type */}
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">인증 유형</label>
                        <select
                            value={certType}
                            onChange={(e) => setCertType(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer appearance-none"
                        >
                            {CERT_TYPES.map(t => (
                                <option key={t.value} value={t.value} className="bg-[#0a0a1a]">{t.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Recipient Wallet Address */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-400 mb-2 block">수령인 지갑 주소</label>
                        <input
                            type="text"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                            placeholder="0x..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

                    {/* Token URI (Optional) */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-400 mb-2 block">
                            메타데이터 URI <span className="text-gray-600">(선택사항, 비우면 자동 생성)</span>
                        </label>
                        <input
                            type="text"
                            value={tokenURI}
                            onChange={(e) => setTokenURI(e.target.value)}
                            placeholder="ipfs://... 또는 https://..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Mint Button */}
                <button
                    onClick={handleIssueCertificate}
                    disabled={!isConnected || !isContractDeployed || !recipientAddress || !recipientName || isMinting || isConfirming || !isCorrectChain}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isMinting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> 트랜잭션 제출 중...</>
                    ) : isConfirming ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> 블록체인 확인 중...</>
                    ) : (
                        <><Send className="w-5 h-5" /> NFT 인증서 발급</>
                    )}
                </button>

                {/* Error Message */}
                {mintError && (
                    <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        <strong>오류:</strong> {mintError.message?.split('\n')[0] || '트랜잭션이 실패했습니다.'}
                    </div>
                )}

                {/* Success Message */}
                <AnimatePresence>
                    {isConfirmed && txHash && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30"
                        >
                            <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                                <CheckCircle className="w-5 h-5" />
                                인증서가 성공적으로 발급되었습니다!
                            </div>
                            <a
                                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:underline"
                            >
                                Etherscan에서 확인 <ExternalLink className="w-3 h-3" />
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Certificate Type Preview */}
            <div className="rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]">
                <h2 className="text-lg font-bold mb-5">인증 유형</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CERT_TYPES.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-4 rounded-xl border border-white/5 ${t.bg}`}
                        >
                            <div className="flex items-center gap-3">
                                <Award className={`w-6 h-6 ${t.color}`} />
                                <div>
                                    <p className={`font-semibold ${t.color}`}>{t.value}</p>
                                    <p className="text-xs text-gray-400">{t.label}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certificate Preview */}
            {recipientName && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-white/5 p-6 bg-[#0a0a1a]"
                >
                    <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-purple-400" />
                        인증서 미리보기
                    </h2>
                    <div className="flex justify-center overflow-auto rounded-xl bg-black/50 p-4">
                        <div style={{ transform: 'scale(0.65)', transformOrigin: 'top center' }}>
                            <CertificateTemplate
                                recipientName={recipientName}
                                certType={certType}
                                issueDate={new Date().toISOString().split('T')[0]}
                                tokenId={totalCerts?.toString() || '0'}
                                walletAddress={recipientAddress || undefined}
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Info */}
            <div className="text-center text-gray-600 text-xs space-y-1">
                <p>🔗 Sepolia Testnet 기반 • 가스비 무료 (테스트 ETH 사용)</p>
                <p>
                    테스트 ETH 받기:{' '}
                    <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
                        sepoliafaucet.com
                    </a>
                </p>
            </div>
        </div>
    );
}
