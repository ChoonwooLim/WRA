'use client';

import { motion } from 'framer-motion';
import { BookOpen, Shield, Wallet, ArrowRight, CheckCircle, AlertTriangle, HelpCircle, ExternalLink, Download, Key, Globe, Lock, Layers, Award, FileText, Users, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface GuideSection {
    id: string;
    icon: React.ElementType;
    title: string;
    color: string;
}

const sections: GuideSection[] = [
    { id: 'overview', icon: BookOpen, title: '개요: 블록체인 인증이란?', color: 'text-cyan-400' },
    { id: 'concepts', icon: Layers, title: '핵심 개념 이해하기', color: 'text-purple-400' },
    { id: 'prepare', icon: Key, title: '사전 준비 (지갑 설정)', color: 'text-green-400' },
    { id: 'issue', icon: Award, title: '인증서 발급 방법', color: 'text-yellow-400' },
    { id: 'manage', icon: FileText, title: '인증서 관리', color: 'text-blue-400' },
    { id: 'verify', icon: Search, title: '인증서 검증 안내', color: 'text-pink-400' },
    { id: 'faq', icon: HelpCircle, title: '자주 묻는 질문 (FAQ)', color: 'text-orange-400' },
];

function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
    return (
        <div className="flex gap-4 mb-6">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg">
                {step}
            </div>
            <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <div className="text-gray-400 text-sm leading-relaxed space-y-2">{children}</div>
            </div>
        </div>
    );
}

function InfoBox({ type, children }: { type: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
    const styles = {
        info: { bg: 'bg-blue-500/5 border-blue-500/20', icon: HelpCircle, color: 'text-blue-400', label: '참고' },
        warning: { bg: 'bg-yellow-500/5 border-yellow-500/20', icon: AlertTriangle, color: 'text-yellow-400', label: '주의' },
        tip: { bg: 'bg-green-500/5 border-green-500/20', icon: CheckCircle, color: 'text-green-400', label: '팁' },
    };
    const s = styles[type];
    return (
        <div className={`${s.bg} border rounded-xl p-4 flex items-start gap-3 my-4`}>
            <s.icon className={`w-5 h-5 ${s.color} shrink-0 mt-0.5`} />
            <div className="text-sm">
                <span className={`${s.color} font-semibold`}>{s.label}: </span>
                <span className="text-gray-300">{children}</span>
            </div>
        </div>
    );
}

export default function CertGuide() {
    const [activeSection, setActiveSection] = useState('overview');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: 'NFT 인증서를 받으려면 반드시 암호화폐를 사야 하나요?',
            a: '아닙니다. 현재 Sepolia 테스트넷을 사용하며, 테스트 ETH는 무료로 받을 수 있습니다. 메인넷 전환 시에도 발급 비용은 WRA가 부담하므로 수령인은 비용이 들지 않습니다. 단, 인증서를 받을 지갑 주소는 필요합니다.',
        },
        {
            q: '지갑을 분실하면 인증서는 없어지나요?',
            a: '인증서 자체는 블록체인에 영구 기록되므로 사라지지 않습니다. 다만, 해당 지갑에 대한 접근권(소유권 증명)은 상실될 수 있습니다. 반드시 시드 문구(복구 문구)를 안전하게 보관하세요.',
        },
        {
            q: '한 사람에게 여러 인증서를 발급할 수 있나요?',
            a: '네, 가능합니다. 각 인증서는 고유한 Token ID를 가지므로, 같은 사람에게 여러 유형의 인증서를 발급할 수 있습니다.',
        },
        {
            q: '발급된 인증서를 취소할 수 있나요?',
            a: '네. 관리자는 "폐기(Revoke)" 기능으로 인증서를 무효화할 수 있습니다. 블록체인에서 삭제되지는 않지만 "폐기됨" 상태로 표시되어, 검증 시 유효하지 않음이 확인됩니다.',
        },
        {
            q: '인증서를 다른 사람에게 양도할 수 있나요?',
            a: 'NFT이므로 기술적으로 전송(양도)이 가능합니다. 그러나 인증서의 "수령인 이름"은 블록체인에 기록되어 변경 불가하므로, 양도해도 원래 수령인 정보는 유지됩니다.',
        },
        {
            q: '인터넷이 없어도 인증서를 확인할 수 있나요?',
            a: '블록체인 조회에는 인터넷 연결이 필요합니다. 다만, 한번 발급된 인증서 정보는 전 세계 수천 개의 노드에 복제되어 있으므로 데이터가 유실될 가능성은 사실상 없습니다.',
        },
        {
            q: 'Sepolia 테스트넷과 메인넷의 차이는 무엇인가요?',
            a: '테스트넷은 실제 가치가 없는 테스트용 네트워크입니다. 기능은 메인넷과 동일하지만, 테스트넷 인증서는 공식적인 효력이 없습니다. 시스템 검증 후 메인넷(또는 Polygon 같은 저비용 체인)으로 전환하면 정식 인증서로 운영됩니다.',
        },
        {
            q: '스마트 컨트랙트란 무엇인가요?',
            a: '블록체인에 배포된 자동 실행 프로그램입니다. WRA의 스마트 컨트랙트는 "인증서 발급", "인증서 조회", "인증서 폐기" 등의 기능을 담고 있으며, 한번 배포되면 누구도 임의로 수정할 수 없습니다.',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                    인증서 발급 매뉴얼
                </h1>
                <p className="text-gray-400 mt-1">블록체인 NFT 인증서의 모든 것 — 초보자도 쉽게 따라할 수 있는 완전 가이드</p>
            </div>

            <div className="flex gap-6">
                {/* Side Navigation */}
                <nav className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-28 space-y-1">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-3">목차</p>
                        {sections.map((s) => {
                            const isActive = activeSection === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        setActiveSection(s.id);
                                        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${isActive ? 'bg-white/5 text-white border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'}`}
                                >
                                    <s.icon className={`w-4 h-4 ${isActive ? s.color : 'text-gray-600'}`} />
                                    {s.title}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-8">

                    {/* ===== 1. OVERVIEW ===== */}
                    <motion.section
                        id="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-cyan-400" />
                            개요: 블록체인 인증이란?
                        </h2>

                        <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                            <p>
                                World Royal Academy(WRA)의 인증서는 전통적인 종이 인증서가 아닌,
                                <strong className="text-white"> 블록체인에 영구적으로 기록되는 디지털 인증서(NFT)</strong>입니다.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                                {[
                                    { icon: Lock, title: '위변조 불가', desc: '한번 기록되면 누구도 수정하거나 삭제할 수 없습니다', color: 'text-red-400' },
                                    { icon: Globe, title: '전세계 검증', desc: '인터넷만 있으면 누구나, 어디서나 진위를 확인할 수 있습니다', color: 'text-blue-400' },
                                    { icon: Shield, title: '영구 보존', desc: '서버 장애나 기관 폐쇄와 무관하게 영원히 존재합니다', color: 'text-green-400' },
                                ].map((f, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <f.icon className={`w-6 h-6 ${f.color} mb-3`} />
                                        <h4 className="text-white font-semibold mb-1">{f.title}</h4>
                                        <p className="text-gray-500 text-xs">{f.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-gray-400">
                                일반적인 인증서는 발급 기관이 사라지면 검증이 불가능합니다. 하지만 블록체인 인증서는
                                전 세계 수천 개의 컴퓨터(노드)에 동시 저장되므로, WRA가 없어지더라도 인증서는 영원히 유효합니다.
                            </p>
                        </div>
                    </motion.section>

                    {/* ===== 2. CONCEPTS ===== */}
                    <motion.section
                        id="concepts"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-purple-400" />
                            핵심 개념 이해하기
                        </h2>

                        <div className="space-y-6">
                            {[
                                {
                                    term: '블록체인 (Blockchain)',
                                    emoji: '⛓️',
                                    explain: '정보를 "블록" 단위로 묶어 "체인"처럼 연결한 분산 데이터베이스입니다. 모든 참여자가 같은 정보를 공유하므로 위변조가 불가능합니다.',
                                    analogy: '📖 비유: 모든 사람이 동시에 보고 있는 공개 장부. 누군가 몰래 내용을 바꾸면 즉시 들킵니다.',
                                },
                                {
                                    term: 'NFT (Non-Fungible Token)',
                                    emoji: '🏷️',
                                    explain: '"대체 불가능한 토큰"이라는 뜻으로, 블록체인에 기록된 고유한 디지털 자산입니다. 각 NFT는 세상에 단 하나뿐이며 소유권이 명확합니다.',
                                    analogy: '📖 비유: 일련번호가 새겨진 예술 작품의 진품 증명서. 복사본은 가능하지만 "진품"은 하나뿐입니다.',
                                },
                                {
                                    term: '지갑 (Wallet)',
                                    emoji: '👛',
                                    explain: '블록체인에서 본인을 증명하고 NFT를 보관하는 디지털 지갑입니다. 은행 계좌와 비슷하지만, 은행 없이 본인이 직접 관리합니다.',
                                    analogy: '📖 비유: 온라인 뱅킹 앱. 주소(계좌번호)가 있고, 비밀키(비밀번호)로 접근합니다.',
                                },
                                {
                                    term: '가스비 (Gas Fee)',
                                    emoji: '⛽',
                                    explain: '블록체인에 정보를 기록할 때 드는 소액의 수수료입니다. 테스트넷에서는 무료이며, 메인넷에서는 WRA가 부담합니다.',
                                    analogy: '📖 비유: 등기 우편의 우표 비용. 내용물 가격과는 별개로, 기록을 남기기 위한 비용입니다.',
                                },
                                {
                                    term: '스마트 컨트랙트 (Smart Contract)',
                                    emoji: '📜',
                                    explain: '블록체인에 올라간 자동 실행 프로그램입니다. "조건이 충족되면 자동으로 실행"되며, 한번 배포하면 변경이 불가능합니다.',
                                    analogy: '📖 비유: 자동판매기. 정해진 규칙대로만 작동하며, 중간에 누군가가 개입할 수 없습니다.',
                                },
                            ].map((concept, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                        <span className="text-lg">{concept.emoji}</span>
                                        {concept.term}
                                    </h4>
                                    <p className="text-gray-300 text-sm mb-2">{concept.explain}</p>
                                    <p className="text-gray-500 text-xs italic">{concept.analogy}</p>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* ===== 3. PREPARATION ===== */}
                    <motion.section
                        id="prepare"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Key className="w-5 h-5 text-green-400" />
                            사전 준비 (지갑 설정)
                        </h2>

                        <StepCard step={1} title="MetaMask 설치">
                            <p>MetaMask는 가장 널리 사용되는 암호화폐 지갑입니다.</p>
                            <p>Chrome/Edge 브라우저에서 <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">metamask.io</a>에 접속하여 확장 프로그램을 설치하세요.</p>
                        </StepCard>

                        <StepCard step={2} title="지갑 생성 및 시드 문구 보관">
                            <p>MetaMask를 처음 실행하면 "새 지갑 만들기"를 선택합니다.</p>
                            <p>12개의 <strong className="text-white">시드 문구(복구 문구)</strong>가 표시됩니다.</p>
                            <InfoBox type="warning">
                                시드 문구는 지갑의 마스터 비밀번호입니다. 반드시 종이에 적어 안전한 곳에 보관하세요.
                                스크린샷이나 클라우드 저장은 절대 금물입니다. 이 문구를 아는 사람은 지갑의 모든 자산에 접근할 수 있습니다.
                            </InfoBox>
                        </StepCard>

                        <StepCard step={3} title="Sepolia 테스트 네트워크 추가">
                            <p>MetaMask 상단 네트워크 선택 → "테스트 네트워크 표시" 활성화 → <strong className="text-white">Sepolia</strong> 선택</p>
                            <InfoBox type="info">
                                Sepolia는 테스트용 네트워크입니다. 여기서 사용하는 ETH는 실제 가치가 없으며, 무료로 받을 수 있습니다.
                            </InfoBox>
                        </StepCard>

                        <StepCard step={4} title="테스트 ETH 받기 (관리자만)">
                            <p>인증서를 발급(민팅)하려면 소량의 테스트 ETH가 필요합니다.</p>
                            <p><a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">sepoliafaucet.com</a> 접속 → MetaMask 지갑 주소 입력 → "Send me ETH" 클릭</p>
                            <InfoBox type="tip">
                                수령인(인증서를 받는 사람)은 테스트 ETH가 필요 없습니다. 지갑 주소만 있으면 됩니다.
                            </InfoBox>
                        </StepCard>

                        <StepCard step={5} title="WRA 관리자 페이지에서 지갑 연결">
                            <p>관리자 대시보드 → <strong className="text-white">인증 관리</strong> 페이지 접속</p>
                            <p>우측 상단 <strong className="text-white">"Connect Wallet"</strong> 버튼 클릭 → MetaMask 선택 → 연결 승인</p>
                            <p>네트워크가 "Sepolia"로 표시되는지 확인합니다.</p>
                        </StepCard>
                    </motion.section>

                    {/* ===== 4. ISSUE ===== */}
                    <motion.section
                        id="issue"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            인증서 발급 방법
                        </h2>

                        <StepCard step={1} title="인증 관리 페이지 접속">
                            <p>관리자 사이드바에서 <strong className="text-white">🛡️ 인증 관리</strong>를 클릭합니다.</p>
                            <p>3개의 상태 카드가 표시됩니다: <em>지갑 상태</em>, <em>네트워크</em>, <em>발급된 인증서 수</em></p>
                        </StepCard>

                        <StepCard step={2} title="발급 정보 입력">
                            <div className="bg-white/[0.03] rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#d4af37] font-mono text-xs w-28 shrink-0">수령인 이름</span>
                                    <span className="text-gray-300">인증서에 표시될 이름 (예: 홍길동)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#d4af37] font-mono text-xs w-28 shrink-0">인증 유형</span>
                                    <span className="text-gray-300">드롭다운에서 선택 (4종 중 택1)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#d4af37] font-mono text-xs w-28 shrink-0">지갑 주소</span>
                                    <span className="text-gray-300">수령인의 MetaMask 지갑 주소 (0x로 시작)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[#d4af37] font-mono text-xs w-28 shrink-0">메타데이터 URI</span>
                                    <span className="text-gray-300">(선택사항) 비우면 자동 생성됩니다</span>
                                </div>
                            </div>
                        </StepCard>

                        <StepCard step={3} title="인증서 미리보기 확인">
                            <p>수령인 이름을 입력하면 하단에 <strong className="text-white">인증서 미리보기</strong>가 실시간으로 표시됩니다.</p>
                            <p>인증 유형, 이름, 날짜 등이 정확한지 확인하세요.</p>
                        </StepCard>

                        <StepCard step={4} title="NFT 인증서 발급 버튼 클릭">
                            <p><strong className="text-cyan-400">"NFT 인증서 발급"</strong> 버튼을 클릭합니다.</p>
                            <p>MetaMask 팝업이 나타나면 <strong className="text-white">"확인(Confirm)"</strong>을 눌러 트랜잭션을 승인합니다.</p>
                            <InfoBox type="info">
                                트랜잭션이 블록체인에 기록되는 데 보통 15~30초가 소요됩니다. "블록체인 확인 중..." 메시지가 표시됩니다.
                            </InfoBox>
                        </StepCard>

                        <StepCard step={5} title="발급 완료 확인">
                            <p>성공 시 초록색 메시지와 함께 <strong className="text-white">Etherscan 링크</strong>가 표시됩니다.</p>
                            <p>링크를 클릭하면 블록체인에 기록된 트랜잭션 상세 정보를 확인할 수 있습니다.</p>
                        </StepCard>

                        {/* Certificate Types */}
                        <div className="mt-8 p-5 bg-white/[0.02] rounded-xl border border-white/5">
                            <h4 className="text-white font-semibold mb-4">📋 인증 유형 안내</h4>
                            <div className="space-y-3">
                                {[
                                    { type: 'K-Royal Warrant', desc: '왕립 인증 — WRA의 최고 등급 인증으로, 왕립 품격과 전통을 인정받은 개인/단체에 수여', color: 'text-yellow-400' },
                                    { type: 'K-Heritage Guide', desc: '문화유산 가이드 — 한국 문화유산에 대한 전문 지식과 안내 능력을 갖춘 가이드에 수여', color: 'text-blue-400' },
                                    { type: 'Educator', desc: '교육자 인증 — WRA 교육 과정을 이수하고 교육자 자격을 갖춘 자에 수여', color: 'text-green-400' },
                                    { type: 'Cultural Ambassador', desc: '문화대사 — 한국 문화의 세계적 확산에 기여한 인물에 수여', color: 'text-purple-400' },
                                ].map((ct, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Award className={`w-4 h-4 ${ct.color} mt-0.5 shrink-0`} />
                                        <div>
                                            <span className={`${ct.color} font-semibold text-sm`}>{ct.type}</span>
                                            <p className="text-gray-400 text-xs mt-0.5">{ct.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>

                    {/* ===== 5. MANAGE ===== */}
                    <motion.section
                        id="manage"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-400" />
                            인증서 관리
                        </h2>

                        <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
                            <div>
                                <h4 className="text-white font-semibold mb-2">📊 발급 현황 확인</h4>
                                <p>인증 관리 페이지 상단의 <strong className="text-white">"발급된 인증서"</strong> 카드에서 총 발급 수를 확인할 수 있습니다.</p>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-2">🔍 인증서 조회</h4>
                                <p>공개 검증 페이지 (<code className="px-1.5 py-0.5 bg-white/5 rounded text-cyan-400 text-xs">/verify</code>)에서 Token ID를 입력하면 인증서 상세 정보를 확인할 수 있습니다.</p>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-2">❌ 인증서 폐기 (Revoke)</h4>
                                <p>인증서를 무효화해야 할 경우:</p>
                                <ol className="list-decimal ml-6 space-y-1 mt-2 text-gray-400">
                                    <li>Etherscan에서 해당 컨트랙트 접속</li>
                                    <li>"Write Contract" → <code className="px-1.5 py-0.5 bg-white/5 rounded text-xs">revokeCertificate</code> 함수 선택</li>
                                    <li>Token ID 입력 → 실행</li>
                                </ol>
                                <InfoBox type="warning">
                                    폐기는 되돌릴 수 없습니다. 블록체인에서 삭제되지는 않지만 "폐기됨" 상태로 영구 표시됩니다.
                                </InfoBox>
                            </div>

                            <div>
                                <h4 className="text-white font-semibold mb-2">📋 관리 체크리스트</h4>
                                <div className="space-y-2 mt-3">
                                    {[
                                        '발급 전 수령인 정보(이름, 지갑주소) 정확히 확인',
                                        '인증 유형이 올바른지 재확인',
                                        '발급 후 Etherscan에서 트랜잭션 성공 여부 확인',
                                        '수령인에게 Token ID와 검증 페이지 URL 안내',
                                        '정기적으로 발급 현황 점검',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400/50 shrink-0" />
                                            <span className="text-gray-400 text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* ===== 6. VERIFY ===== */}
                    <motion.section
                        id="verify"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5 text-pink-400" />
                            인증서 검증 안내
                        </h2>

                        <div className="text-sm text-gray-300 leading-relaxed space-y-4">
                            <p>인증서를 받은 분이나 제3자가 진위를 확인하는 방법입니다.</p>

                            <StepCard step={1} title="검증 페이지 접속">
                                <p>WRA 웹사이트의 <strong className="text-white">/verify</strong> 페이지에 접속합니다.</p>
                                <p>이 페이지는 로그인 없이 누구나 접근할 수 있습니다.</p>
                            </StepCard>

                            <StepCard step={2} title="인증서 번호 입력">
                                <p>발급 시 부여된 <strong className="text-white">Token ID</strong> (0, 1, 2...) 를 입력하고 "조회" 버튼을 클릭합니다.</p>
                            </StepCard>

                            <StepCard step={3} title="결과 확인">
                                <p>조회 결과에 다음 정보가 표시됩니다:</p>
                                <div className="bg-white/[0.03] rounded-lg p-3 space-y-1.5 mt-2">
                                    <p>• <strong className="text-white">상태</strong>: 유효 ✅ 또는 폐기됨 ❌</p>
                                    <p>• <strong className="text-white">인증 유형</strong>: K-Royal Warrant 등</p>
                                    <p>• <strong className="text-white">수령인</strong>: 인증서에 기록된 이름</p>
                                    <p>• <strong className="text-white">발급일</strong>: 블록체인 기록 시점</p>
                                    <p>• <strong className="text-white">소유자 지갑</strong>: 현재 인증서 소유자의 지갑 주소</p>
                                </div>
                            </StepCard>

                            <InfoBox type="tip">
                                Etherscan이나 OpenSea 링크를 클릭하면 블록체인 탐색기에서 독립적으로 검증할 수도 있습니다.
                                이는 WRA 사이트와 무관한 제3자 검증 방법입니다.
                            </InfoBox>
                        </div>
                    </motion.section>

                    {/* ===== 7. FAQ ===== */}
                    <motion.section
                        id="faq"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl border border-white/5 p-6 md:p-8 bg-[#0a0a1a]"
                    >
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-orange-400" />
                            자주 묻는 질문 (FAQ)
                        </h2>

                        <div className="space-y-2">
                            {faqs.map((faq, i) => {
                                const isOpen = openFaq === i;
                                return (
                                    <div key={i} className="rounded-xl overflow-hidden border border-white/5">
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : i)}
                                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-orange-400 font-bold text-sm shrink-0">Q{i + 1}</span>
                                                <span className="text-white text-sm font-medium">{faq.q}</span>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="px-4 pb-4"
                                            >
                                                <div className="ml-9 text-sm text-gray-400 leading-relaxed bg-white/[0.02] rounded-lg p-3">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { icon: Shield, label: '인증서 발급하기', href: '/admin/certifications', color: 'from-cyan-500/20 to-blue-500/20', textColor: 'text-cyan-400' },
                            { icon: Search, label: '인증서 검증하기', href: '/verify', color: 'from-green-500/20 to-emerald-500/20', textColor: 'text-green-400' },
                            { icon: ExternalLink, label: 'Etherscan 보기', href: 'https://sepolia.etherscan.io', color: 'from-purple-500/20 to-violet-500/20', textColor: 'text-purple-400' },
                        ].map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                target={link.href.startsWith('http') ? '_blank' : undefined}
                                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`p-4 rounded-xl bg-gradient-to-br ${link.color} border border-white/5 hover:border-white/15 transition-all flex items-center gap-3 group`}
                            >
                                <link.icon className={`w-5 h-5 ${link.textColor}`} />
                                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{link.label}</span>
                                <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:translate-x-1 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
