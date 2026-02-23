'use client';

import React, { forwardRef } from 'react';

interface CertificateTemplateProps {
    recipientName: string;
    certType: string;
    issueDate: string;
    tokenId: string | number;
    walletAddress?: string;
    txHash?: string;
}

/**
 * Printable/Exportable WRA Certificate Template
 * Uses CSS for styling — can be rendered to canvas/PDF
 */
const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
    ({ recipientName, certType, issueDate, tokenId, walletAddress, txHash }, ref) => {
        return (
            <div
                ref={ref}
                className="certificate-wrapper"
                style={{
                    width: '800px',
                    minHeight: '1060px',
                    background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 30%, #0a1628 100%)',
                    position: 'relative',
                    fontFamily: "'Noto Serif KR', 'Playfair Display', Georgia, serif",
                    color: '#d4af37',
                    padding: '40px',
                    overflow: 'hidden',
                }}
            >
                {/* Watermark Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.03,
                    backgroundImage: `url('/images/wra-logo-crest.png')`,
                    backgroundSize: '200px',
                    backgroundRepeat: 'repeat',
                    pointerEvents: 'none',
                }} />

                {/* Outer Gold Border */}
                <div style={{
                    position: 'absolute',
                    inset: '20px',
                    border: '2px solid rgba(212, 175, 55, 0.6)',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                }} />

                {/* Inner Gold Border */}
                <div style={{
                    position: 'absolute',
                    inset: '28px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                }} />

                {/* Corner Decorations */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
                    const isTop = corner.includes('top');
                    const isLeft = corner.includes('left');
                    return (
                        <div
                            key={corner}
                            style={{
                                position: 'absolute',
                                [isTop ? 'top' : 'bottom']: '32px',
                                [isLeft ? 'left' : 'right']: '32px',
                                width: '60px',
                                height: '60px',
                                borderTop: isTop ? '3px solid #d4af37' : 'none',
                                borderBottom: !isTop ? '3px solid #d4af37' : 'none',
                                borderLeft: isLeft ? '3px solid #d4af37' : 'none',
                                borderRight: !isLeft ? '3px solid #d4af37' : 'none',
                                borderRadius: '4px',
                                pointerEvents: 'none',
                            }}
                        />
                    );
                })}

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '20px' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <img
                            src="/images/wra-logo-crest.png"
                            alt="WRA Crest"
                            style={{
                                width: '140px',
                                height: '140px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 20px rgba(212, 175, 55, 0.3))',
                            }}
                        />
                    </div>

                    {/* Academy Name */}
                    <p style={{
                        fontSize: '13px',
                        letterSpacing: '8px',
                        color: 'rgba(212, 175, 55, 0.7)',
                        marginBottom: '4px',
                        fontWeight: 400,
                    }}>
                        세 계 왕 립 아 카 데 미
                    </p>
                    <p style={{
                        fontSize: '11px',
                        letterSpacing: '6px',
                        color: 'rgba(212, 175, 55, 0.5)',
                        marginBottom: '30px',
                        fontWeight: 300,
                    }}>
                        WORLD ROYAL ACADEMY
                    </p>

                    {/* Divider */}
                    <div style={{
                        width: '200px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                        margin: '0 auto 30px',
                    }} />

                    {/* Title */}
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        letterSpacing: '6px',
                        background: 'linear-gradient(180deg, #f5e6a3 0%, #d4af37 50%, #b8962e 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '8px',
                    }}>
                        CERTIFICATE
                    </h1>
                    <p style={{
                        fontSize: '14px',
                        letterSpacing: '4px',
                        color: 'rgba(212, 175, 55, 0.6)',
                        marginBottom: '40px',
                    }}>
                        OF AUTHENTICATION
                    </p>

                    {/* Certificate Type Badge */}
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 24px',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        borderRadius: '30px',
                        fontSize: '13px',
                        letterSpacing: '3px',
                        color: '#d4af37',
                        marginBottom: '36px',
                        background: 'rgba(212, 175, 55, 0.05)',
                    }}>
                        {certType}
                    </div>

                    {/* "This certifies that" */}
                    <p style={{
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.4)',
                        marginBottom: '16px',
                        letterSpacing: '2px',
                    }}>
                        본 인증서는 다음의 인물에게 수여합니다
                    </p>

                    {/* Recipient Name */}
                    <h2 style={{
                        fontSize: '36px',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '8px',
                        textShadow: '0 2px 20px rgba(212, 175, 55, 0.2)',
                    }}>
                        {recipientName || '수령인 이름'}
                    </h2>

                    {/* Name underline */}
                    <div style={{
                        width: '300px',
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
                        margin: '0 auto 40px',
                    }} />

                    {/* Description */}
                    <p style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.35)',
                        lineHeight: 1.8,
                        maxWidth: '500px',
                        margin: '0 auto 40px',
                    }}>
                        World Royal Academy는 상기인이 본 아카데미의 심사 기준을 충족하였음을
                        인증하며, 이 인증서를 블록체인에 영구적으로 기록합니다.
                    </p>

                    {/* Details Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '20px',
                        maxWidth: '560px',
                        margin: '0 auto 40px',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '6px' }}>
                                ISSUE DATE
                            </p>
                            <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 600 }}>
                                {issueDate || '2026-02-23'}
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '6px' }}>
                                TOKEN ID
                            </p>
                            <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 600 }}>
                                #{tokenId}
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '6px' }}>
                                NETWORK
                            </p>
                            <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 600 }}>
                                Ethereum
                            </p>
                        </div>
                    </div>

                    {/* Blockchain Verification Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '8px',
                        background: 'rgba(0, 212, 255, 0.05)',
                        marginBottom: '30px',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                        <span style={{ fontSize: '10px', color: '#00d4ff', letterSpacing: '2px' }}>
                            VERIFIED ON ETHEREUM BLOCKCHAIN
                        </span>
                    </div>

                    {/* Wallet Address */}
                    {walletAddress && (
                        <p style={{
                            fontSize: '9px',
                            color: 'rgba(255,255,255,0.2)',
                            fontFamily: 'monospace',
                            marginBottom: '20px',
                            wordBreak: 'break-all',
                            maxWidth: '500px',
                            margin: '0 auto',
                        }}>
                            Owner: {walletAddress}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

CertificateTemplate.displayName = 'CertificateTemplate';

export default CertificateTemplate;
