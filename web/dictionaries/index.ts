export type Dictionary = {
    navbar: {
        curriculum: string;
        admissions: string;
        about: string;
        adminDashboard: string;
        startLogin: string;
        loginSignup: string;
    };
    home: {
        welcome: string;
        titleLine1: string;
        titleLine2: string;
        subtitle: string;
        startApplication: string;
        exploreCurriculum: string;
        scrollDown: string;
        features: {
            blockchain: { title: string; desc: string };
            network: { title: string; desc: string };
            curriculum: { title: string; desc: string };
        };
        royal33: {
            title: string;
            subtitle: string;
            description: string;
            benefit1: string;
            benefit2: string;
            benefit3: string;
            cta: string;
        };
        digitalSeal: {
            title: string;
            subtitle: string;
            description: string;
            feature1: string;
            feature2: string;
        };
        ceoProgram: {
            title: string;
            subtitle: string;
            description: string;
            schedule: string;
            cta: string;
        };
        footer: string;
    };
};

export const en: Dictionary = {
    navbar: {
        curriculum: 'Curriculum',
        admissions: 'Admissions',
        about: 'About',
        adminDashboard: 'Admin Dashboard',
        startLogin: 'Start Login',
        loginSignup: 'Login / Sign Up'
    },
    home: {
        welcome: 'Welcome to the Future of Education',
        titleLine1: 'World Royal',
        titleLine2: 'Academy',
        subtitle: 'The World Royal Academy combines prestigious tradition with cutting-edge blockchain technology. Join a global network of elite scholars and future leaders.',
        startApplication: 'Start Application',
        exploreCurriculum: 'Explore Curriculum',
        scrollDown: 'Scroll to Discover',
        features: {
            blockchain: {
                title: 'Blockchain Verified',
                desc: 'Your credentials and achievements are mintable as Soulbound Tokens (SBTs), ensuring immutable proof of excellence.'
            },
            network: {
                title: 'Global Network',
                desc: 'Connect with alumni and scholars from over 50 nations in our exclusive decentralized autonomous organization (DAO).'
            },
            curriculum: {
                title: 'Elite Curriculum',
                desc: 'Learn from world-class experts in leadership, finance, and technology with our proprietary royal curriculum.'
            }
        },
        royal33: {
            title: 'The Royal 33',
            subtitle: 'Exclusive Membership for the Top 1%',
            description: 'A prestigious selection of 33 global leaders who define the future. Membership grants unparalleled access to the Royal Network and governance rights within the WRA Foundation.',
            benefit1: 'Global Networking & Private Summits',
            benefit2: 'Royal Identity & Digital Sovereignty',
            benefit3: 'Investment Opportunities in Web3 Projects',
            cta: 'Apply for Royal 33'
        },
        digitalSeal: {
            title: 'The Digital Seal (Okiae)',
            subtitle: 'Blockchain-Based Royal Branding Strategy',
            description: 'The "Digital Okiae" represents the perfect fusion of heritage and technology. It serves as an immutable seal of authenticity for all certifications and partnerships issued by the Academy.',
            feature1: 'Immutable Proof of Authority',
            feature2: 'Global Standard Integration'
        },
        ceoProgram: {
            title: 'Royal CEO Leadership',
            subtitle: 'Completing the Dignity of a Leader',
            description: 'An executive program designed for visionaries. Master the art of "Royal Leadership" — a blend of ethical governance, strategic foresight, and digital transformation.',
            schedule: 'Next Cohort: March 2026',
            cta: 'Download Brochure'
        },
        footer: '© 2026 World Royal Academy. All Rights Reserved.'
    }
};

export const ko: Dictionary = {
    navbar: {
        curriculum: '교육과정',
        admissions: '입학안내',
        about: '학교소개',
        adminDashboard: '관리자 대시보드',
        startLogin: '로그인 시작',
        loginSignup: '로그인 / 회원가입'
    },
    home: {
        welcome: '미래 교육의 중심에 오신 것을 환영합니다',
        titleLine1: '세계 왕립',
        titleLine2: '아카데미',
        subtitle: '세계 왕립 아카데미는 명망 높은 전통과 최첨단 블록체인 기술을 결합합니다. 전 세계 엘리트 학자 및 미래 리더들의 네트워크에 참여하세요.',
        startApplication: '입학 신청하기',
        exploreCurriculum: '교육과정 둘러보기',
        scrollDown: '아래로 스크롤하여 더 알아보기',
        features: {
            blockchain: {
                title: '블록체인 인증',
                desc: '모든 학위와 성과는 소울바운드 토큰(SBT)으로 발행되어, 위변조가 불가능한 영구적인 증명을 제공합니다.'
            },
            network: {
                title: '글로벌 네트워크',
                desc: '50개국 이상의 동문 및 석학들과 연결되는 독점적인 탈중앙화 자율 조직(DAO)에 참여할 수 있습니다.'
            },
            curriculum: {
                title: '엘리트 커리큘럼',
                desc: '리더십, 금융, 기술 분야의 세계적인 전문가들로부터 배우는 왕립 아카데미만의 독보적인 교육과정을 경험하세요.'
            }
        },
        royal33: {
            title: 'The Royal 33',
            subtitle: '대한민국 상위 1%를 위한 멤버십',
            description: '미래를 정의하는 33인의 글로벌 리더를 위한 명예로운 자리입니다. Royal 33 멤버십은 왕립 네트워크에 대한 독점적 접근 권한과 WRA 재단의 거버넌스 권리를 부여합니다.',
            benefit1: '글로벌 네트워킹 및 프라이빗 서밋 초청',
            benefit2: '로열 아이덴티티 및 디지털 주권(Digital Sovereignty) 확보',
            benefit3: 'Web3 프로젝트 및 글로벌 펀드 투자 기회',
            cta: 'Royal 33 멤버십 신청'
        },
        digitalSeal: {
            title: '디지털 옥새 (Digital Okiae)',
            subtitle: '블록체인 기반의 명품 브랜딩 전략',
            description: '"디지털 옥새"는 유산(Heritage)과 기술(Technology)의 완벽한 융합을 상징합니다. 아카데미가 발급하는 모든 인증과 파트너십에 대해 위변조 불가능한 진본성을 보증합니다.',
            feature1: '불멸의 권위 증명 (Immutable Proof)',
            feature2: '글로벌 표준 블록체인 통합'
        },
        ceoProgram: {
            title: 'CEO 황실의 품격',
            subtitle: '리더를 완성하는 고격의 리더십 교육',
            description: '비전가를 위한 최고경영자 과정입니다. 윤리적 거버넌스, 전략적 통찰, 그리고 디지털 혁신이 결합된 "로열 리더십"의 진수를 마스터하십시오.',
            schedule: '다음 기수 모집: 2026년 3월',
            cta: '브로슈어 다운로드'
        },
        footer: '© 2026 세계 왕립 아카데미 (World Royal Academy). All Rights Reserved.'
    }
};
