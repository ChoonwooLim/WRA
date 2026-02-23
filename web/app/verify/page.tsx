'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, CheckCircle, XCircle, ExternalLink, Award, Hash, User, Calendar, Wallet, AlertCircle } from 'lucide-react';
import { useReadContract } from 'wagmi';
import { HeroBanner } from '@/components/shared/HeroBanner';
import { WRA_CERT_CONTRACT_ADDRESS, WRA_CERT_ABI, CERT_TYPES, CERT_CHAIN_ID } from '@/lib/contracts/wraCertificate';

export default function VerifyCertificatePage() {
    const [tokenId, setTokenId] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    const isContractDeployed = WRA_CERT_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';
    const parsedTokenId = tokenId ? BigInt(tokenId) : BigInt(0);

    // Read certificate data from chain
    const { data: certData, isLoading, isError, error } = useReadContract({
        address: WRA_CERT_CONTRACT_ADDRESS,
        abi: WRA_CERT_ABI,
        functionName: 'getCertificate',
        args: [parsedTokenId],
        chainId: CERT_CHAIN_ID,
        query: { enabled: searchTriggered && isContractDeployed && tokenId !== '' },
    });

    function handleSearch() {
        if (!tokenId) return;
        setSearchTriggered(true);
    }

    const certTypeInfo = certData ? CERT_TYPES.find(t => t.value === certData[0]) : null;

    return (
        <div className="bg-[#050510] min-h-screen">
            <HeroBanner title="인증서 검증" subtitle="블록체인에 기록된 WRA 인증서의 진위를 확인합니다" compact />

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-2xl">
                    {/* Search Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl p-8 mb-8"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-cyan-400" />
                            인증서 조회
                        </h2>
                        <p className="text-gray-400 text-sm mb-6">
                            인증서 번호(Token ID)를 입력하면 블록체인에서 인증서 정보를 조회합니다.
                        </p>

                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="number"
                                    min="0"
                                    value={tokenId}
                                    onChange={(e) => { setTokenId(e.target.value); setSearchTriggered(false); }}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="인증서 번호 (예: 0, 1, 2...)"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors text-lg"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={!tokenId || !isContractDeployed}
                                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Search className="w-5 h-5" />
                                조회
                            </button>
                        </div>

                        {!isContractDeployed && (
                            <div className="mt-4 flex items-center gap-2 text-yellow-400 text-xs">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                스마트 컨트랙트가 아직 배포되지 않았습니다.
                            </div>
                        )}
                    </motion.div>

                    {/* Results */}
                    <AnimatePresence mode="wait">
                        {isLoading && searchTriggered && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="glass-card rounded-2xl p-8 text-center"
                            >
                                <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-gray-400">블록체인에서 조회 중...</p>
                            </motion.div>
                        )}

                        {isError && searchTriggered && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="glass-card rounded-2xl p-8"
                            >
                                <div className="flex items-center gap-3 text-red-400 mb-4">
                                    <XCircle className="w-8 h-8" />
                                    <div>
                                        <h3 className="text-lg font-bold">인증서를 찾을 수 없습니다</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            입력한 번호의 인증서가 존재하지 않거나, 네트워크 오류가 발생했습니다.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {certData && searchTriggered && !isLoading && !isError && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                {/* Certificate Card */}
                                <div className={`rounded-2xl border-2 p-8 relative overflow-hidden ${certData[3] ? 'border-red-500/50 bg-red-500/5' : 'border-[#d4af37]/50 bg-[#d4af37]/5'}`}>
                                    {/* Background pattern */}
                                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(212,175,55,0.1) 20px, rgba(212,175,55,0.1) 22px)',
                                    }} />

                                    {/* Status Badge */}
                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <Award className={`w-10 h-10 ${certData[3] ? 'text-red-400' : 'text-[#d4af37]'}`} />
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">WRA 인증서</h3>
                                                <p className="text-gray-400 text-sm">World Royal Academy Certificate</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${certData[3]
                                            ? 'bg-red-500/10 border-red-500/30 text-red-400'
                                            : 'bg-green-500/10 border-green-500/30 text-green-400'
                                            }`}>
                                            {certData[3] ? (
                                                <span className="flex items-center gap-1"><XCircle className="w-4 h-4" /> 폐기됨</span>
                                            ) : (
                                                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> 유효</span>
                                            )}
                                        </span>
                                    </div>

                                    {/* Certificate Details */}
                                    <div className="space-y-4 relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-black/20 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                                    <Hash className="w-3 h-3" />
                                                    인증서 번호
                                                </div>
                                                <p className="text-white font-bold text-lg">#{tokenId}</p>
                                            </div>
                                            <div className="bg-black/20 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                                    <Shield className="w-3 h-3" />
                                                    인증 유형
                                                </div>
                                                <p className={`font-bold text-lg ${certTypeInfo?.color || 'text-white'}`}>
                                                    {certData[0]}
                                                </p>
                                            </div>
                                            <div className="bg-black/20 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                                    <User className="w-3 h-3" />
                                                    수령인
                                                </div>
                                                <p className="text-white font-bold text-lg">{certData[1]}</p>
                                            </div>
                                            <div className="bg-black/20 rounded-xl p-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                                    <Calendar className="w-3 h-3" />
                                                    발급일
                                                </div>
                                                <p className="text-white font-bold text-lg">
                                                    {new Date(Number(certData[2]) * 1000).toLocaleDateString('ko-KR')}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Owner */}
                                        <div className="bg-black/20 rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                                <Wallet className="w-3 h-3" />
                                                소유자 지갑
                                            </div>
                                            <p className="text-white font-mono text-sm break-all">{certData[4]}</p>
                                        </div>
                                    </div>

                                    {/* Etherscan Link */}
                                    <div className="mt-6 flex gap-3 relative z-10">
                                        <a
                                            href={`https://sepolia.etherscan.io/token/${WRA_CERT_CONTRACT_ADDRESS}?a=${tokenId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Etherscan에서 확인
                                        </a>
                                        <a
                                            href={`https://testnets.opensea.io/assets/sepolia/${WRA_CERT_CONTRACT_ADDRESS}/${tokenId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            OpenSea에서 보기
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* How it works */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-8 mt-8"
                    >
                        <h3 className="text-lg font-bold text-white mb-4">블록체인 인증이란?</h3>
                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start gap-3">
                                <span className="text-[#d4af37] font-bold shrink-0">01</span>
                                <p>World Royal Academy의 인증서는 <strong className="text-white">이더리움 블록체인</strong>에 NFT로 기록됩니다.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#d4af37] font-bold shrink-0">02</span>
                                <p>한번 발급된 인증서는 <strong className="text-white">위조 및 변조가 불가능</strong>하며, 누구나 진위를 확인할 수 있습니다.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#d4af37] font-bold shrink-0">03</span>
                                <p>인증서를 소유한 지갑 주소로 <strong className="text-white">디지털 소유권</strong>이 증명됩니다.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
