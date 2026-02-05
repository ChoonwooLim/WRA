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
        features: {
            blockchain: { title: string; desc: string };
            network: { title: string; desc: string };
            curriculum: { title: string; desc: string };
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
        footer: '© 2026 세계 왕립 아카데미 (World Royal Academy). All Rights Reserved.'
    }
};
