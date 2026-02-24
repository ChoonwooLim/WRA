export type Dictionary = {
    navbar: {
        crownPrince: string;
        about: string;
        warrant: string;
        community: string;
        adminDashboard: string;
        startLogin: string;
        loginSignup: string;
        // Crown Prince submenu
        profile: string;
        lineage: string;
        congratulations: string;
        // About submenu
        foundingPhilosophy: string;
        vision: string;
        coreValuesPage: string;
        organization: string;
        textbooksPage: string;
        // WRA Warrant submenu
        education: string;
        kLanguage: string;
        kLiterature: string;
        kStudies: string;
        tours: string;
        membership: string;
        consulting: string;
        // Community submenu
        notices: string;
        newsletter: string;
        qna: string;
        // Legacy keys (kept for page content compatibility)
        certification: string;
        services: string;
        activities: string;
        message: string;
        partners: string;
        ceoProfile: string;
        royalWarrant: string;
        royal33: string;
        digitalSeal: string;
        contact: string;
        textbooks: string;
    };
    home: {
        welcome: string;
        titleLine1: string;
        titleLine2: string;
        subtitle: string;
        startApplication: string;
        exploreCurriculum: string;
        scrollDown: string;
        learnMore: string;
        // Greeting
        greeting: {
            title: string;
            name: string;
            role: string;
            message: string;
        };
        // Core Values
        coreValues: {
            title: string;
            subtitle: string;
            hongik: { title: string; desc: string };
            wisdom: { title: string; desc: string };
            peace: { title: string; desc: string };
            creation: { title: string; desc: string };
            heritage: { title: string; desc: string };
            harmony: { title: string; desc: string };
            humanity: { title: string; desc: string };
        };
        // Warrant Highlights
        warrantHighlights: {
            title: string;
            subtitle: string;
            education: { title: string; desc: string };
            certification: { title: string; desc: string };
            consulting: { title: string; desc: string };
            tours: { title: string; desc: string };
            membership: { title: string; desc: string };
        };
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
        news: {
            title: string;
            subtitle: string;
            viewAll: string;
        };
        footer: string;
    };
    footer: {
        description: string;
        quickLinks: string;
        contactInfo: string;
        phone: string;
        email: string;
        sns: string;
        copyright: string;
    };
    pages: {
        crownPrince: {
            heroTitle: string;
            heroSubtitle: string;
            fullName: string;
            title: string;
            introduction: string;
            lineageTitle: string;
            lineageDesc: string;
            activitiesTitle: string;
            activitiesDesc: string;
            messageTitle: string;
        };
        about: {
            heroTitle: string;
            heroSubtitle: string;
            visionTitle: string;
            visionStatement: string;
            missionStatement: string;
            orgTitle: string;
            orgDesc: string;
            partnersTitle: string;
            partnersDesc: string;
        };
        education: {
            heroTitle: string;
            heroSubtitle: string;
            languageTitle: string;
            languageDesc: string;
            topikTitle: string;
            topikDesc: string;
            lmsTitle: string;
            lmsDesc: string;
            literatureTitle: string;
            literatureDesc: string;
            step1: string;
            step2: string;
            step3: string;
            step4: string;
            studiesTitle: string;
            studiesDesc: string;
            textbooksTitle: string;
            textbooksDesc: string;
        };
        certification: {
            heroTitle: string;
            heroSubtitle: string;
            warrantTitle: string;
            warrantDesc: string;
            processApply: string;
            processReview: string;
            processCertify: string;
            processRenew: string;
            royal33Title: string;
            royal33Desc: string;
            sealTitle: string;
            sealDesc: string;
        };
        services: {
            heroTitle: string;
            heroSubtitle: string;
            consultingTitle: string;
            consultingDesc: string;
            step1: string;
            step2: string;
            step3: string;
            step4: string;
            step5: string;
            toursTitle: string;
            toursDesc: string;
        };
        community: {
            heroTitle: string;
            heroSubtitle: string;
            noticesTitle: string;
            newsletterTitle: string;
            newsletterDesc: string;
            qnaTitle: string;
            contactTitle: string;
            contactDesc: string;
            subscribe: string;
            submit: string;
            namePlaceholder: string;
            emailPlaceholder: string;
            subjectPlaceholder: string;
            messagePlaceholder: string;
        };
    };
};

export const en: Dictionary = {
    navbar: {
        crownPrince: 'Crown Prince',
        about: 'About WRA',
        warrant: 'WRA Warrant',
        community: 'Community',
        adminDashboard: 'Admin Dashboard',
        startLogin: 'Start Login',
        loginSignup: 'Login / Sign Up',
        profile: 'Profile',
        lineage: 'Royal Lineage',
        congratulations: 'Congratulations & Welcome',
        foundingPhilosophy: 'Founding Philosophy',
        vision: 'Vision & Mission',
        coreValuesPage: 'Core Values',
        organization: 'Organization',
        textbooksPage: 'Textbooks',
        education: 'Education',
        kLanguage: 'K-Heritage Language',
        kLiterature: 'Korean Literature',
        kStudies: 'K-Studies',
        tours: 'Royal Tours',
        membership: 'Membership',
        consulting: 'Royal Consulting',
        notices: 'Notices',
        newsletter: 'Newsletter',
        qna: 'Q&A',
        // Legacy keys
        certification: 'Certification',
        services: 'Services',
        activities: 'Activities',
        message: 'Welcome Message',
        partners: 'Partners',
        ceoProfile: 'CEO Profile',
        royalWarrant: 'K-Royal Warrant',
        royal33: 'The Royal 33',
        digitalSeal: 'Digital Seal',
        contact: 'Contact',
        textbooks: 'Published Books',
    },
    home: {
        welcome: 'Welcome to the Center of Hallyu Management',
        titleLine1: 'World Royal',
        titleLine2: 'Academy',
        subtitle: 'World Royal Academy is a global platform integrating education, culture, and business based on the authentic heritage of the Korean Royal Family.',
        startApplication: 'Start Application',
        exploreCurriculum: 'Explore Programs',
        scrollDown: 'Scroll to Discover',
        learnMore: 'Learn More',
        greeting: {
            title: 'Greeting from the Chairman',
            name: 'HRH Crown Prince Lee Won',
            role: 'Chairman, World Royal Academy\nKorean Imperial Cultural Foundation',
            message: 'We extend our deepest gratitude to all who have found their way to the **World Royal Academy**.\n\nThe world has entered an era where the **dignity and identity** of nations are being redefined through **culture and education**. Historically, **royal families** have served as symbols of their nations and as **pillars of diplomacy**, connecting and fostering civilizations.\n\nThe World Royal Academy aspires to be a **public diplomacy education platform** built upon traditional values and linked with **international royal networks**. Going beyond simple exchanges, we aim to build a **governance of dignity** through mutual respect and cooperation in each nation\'s history, culture, and education.\n\nKorea\'s **K-Heritage** is a crystallization of the spirit and culture forged over a long history. Our people established a cultural nation upon two pillars: **astronomical philosophy** and **self-cultivation culture**. From stargazing astronomy emerged the **Cheon-Ji-In (Heaven-Earth-Humanity)** philosophy and the **Yin-Yang Five Elements** principles derived from observing the sun, moon, and five visible planets.\n\nFrom the culture of self-cultivation arose the exploration of the human body in **Korean traditional medicine** and the principle of **Yaksik-Dongwon** — that food and medicine share the same origin. Traditions such as **Seon philosophy** and **Danhak** originated from this cultivation culture.\n\nWe seek to **modernize and expand** the vast and profound origins of our culture, opening a **new chapter of civilizational exchange** with the international community.\n\nFirst, under the vision of \'**K-HUMAN** (Korea Human Report),\' we will build **cooperative networks** with international royal families and traditional cultural institutions.\n\nSecond, we will operate **global youth leader exchange programs**.\n\nThird, we will pursue joint projects in **cultural diplomacy** and **educational diplomacy**.\n\nFourth, through establishing **academic-industrial models** based on K-Heritage, we will contribute to Korea\'s leap as a **central nation for global talent** and civilizational exchange.\n\nNow, royal dignity arises not from authority but from **responsibility**. It aspires not to control but to **freedom**. The World Royal Academy will cooperate with the world through the responsibility of leading future society, becoming an **international platform** that designs its future based on its unique traditions.\n\nWe declare that we will move toward a more **nurturing, warm, and progressive future** — where tradition serves not as a relic of the past but as **spiritual roots**, and where the present embraces not cold science alone but the **humanistic foundations** of our spiritual heritage.\n\nFor a shared future, like the traditional Korean spirit of **Dure and Pumasi** — working together as one — we ask for your continued interest and participation. Thank you.',
        },
        coreValues: {
            title: 'WRA Introduction_Core Values',
            subtitle: 'The creative spirit (DNA) of Koreans that benefits the world',
            hongik: { title: 'Hongik (Benefit)', desc: 'The creative spirit (DNA) of\nKoreans that benefits the world' },
            wisdom: { title: 'Wisdom', desc: 'Reasoning (thought),\nreflection (introspection),\nawakening (realization)' },
            peace: { title: 'Peace', desc: 'Cultural diversity,\ntolerance and harmony' },
            creation: { title: 'Creation', desc: 'Enhancing problem-solving through\nconvergence while respecting differences' },
            heritage: { title: 'Heritage', desc: 'Passing down the heritage\nof peace to future generations' },
            harmony: { title: 'Harmony', desc: 'Cultural diversity,\ntolerance and harmonious coexistence' },
            humanity: { title: 'Humanity', desc: 'Compassion and love for all people\nbeyond borders' },
        },
        warrantHighlights: {
            title: 'WRA Warrants',
            subtitle: 'Four pillars of excellence',
            education: { title: 'Education', desc: 'K-Heritage Language, Literature, and Korean Studies programs with AI-powered learning.' },
            certification: { title: 'Certification', desc: 'K-Royal Warrant — the prestigious mark of Korean craftsmanship and philosophy.' },
            consulting: { title: 'Consulting', desc: 'Royal Management Consulting.' },
            tours: { title: 'Tours', desc: 'Curated premium heritage tours.' },
            membership: { title: 'Membership', desc: 'Exclusive membership programs.' },
        },
        features: {
            blockchain: { title: 'Blockchain Verified', desc: 'Your credentials and achievements are mintable as Soulbound Tokens (SBTs), ensuring immutable proof of excellence.' },
            network: { title: 'Global Network', desc: 'Connect with alumni and scholars from over 50 nations in our exclusive decentralized autonomous organization (DAO).' },
            curriculum: { title: 'Elite Curriculum', desc: 'Learn from world-class experts in leadership, finance, and technology with our proprietary royal curriculum.' },
        },
        royal33: {
            title: 'The Royal 33',
            subtitle: 'Exclusive Membership for the Top 1%',
            description: 'A prestigious selection of 33 global leaders who define the future. Membership grants unparalleled access to the Royal Network and governance rights within the WRA Foundation.',
            benefit1: 'Global Networking & Private Summits',
            benefit2: 'Royal Identity & Digital Sovereignty',
            benefit3: 'Investment Opportunities in Web3 Projects',
            cta: 'Apply for Royal 33',
        },
        digitalSeal: {
            title: 'The Digital Seal (Okiae)',
            subtitle: 'Blockchain-Based Royal Branding Strategy',
            description: 'The "Digital Okiae" represents the perfect fusion of heritage and technology. It serves as an immutable seal of authenticity for all certifications and partnerships issued by the Academy.',
            feature1: 'Immutable Proof of Authority',
            feature2: 'Global Standard Integration',
        },
        ceoProgram: {
            title: 'Royal CEO Leadership',
            subtitle: 'Completing the Dignity of a Leader',
            description: 'An executive program designed for visionaries. Master the art of "Royal Leadership" — a blend of ethical governance, strategic foresight, and digital transformation.',
            schedule: 'Next Cohort: March 2026',
            cta: 'Download Brochure',
        },
        news: {
            title: 'Latest News',
            subtitle: 'Stay updated with the latest from World Royal Academy',
            viewAll: 'View All',
        },
        footer: '© 2026 World Royal Academy. All Rights Reserved.',
    },
    footer: {
        description: 'A global platform integrating education, culture, and business based on the authentic heritage of the Korean Royal Family.',
        quickLinks: 'Quick Links',
        contactInfo: 'Contact',
        phone: '+82 10-2886-7392',
        email: 'info@wra.academy',
        sns: '@세계왕립아카데미',
        copyright: '© 2026 World Royal Academy. All Rights Reserved.',
    },
    pages: {
        crownPrince: {
            heroTitle: 'HRH Crown Prince Lee Won',
            heroSubtitle: 'Chancellor of World Royal Academy',
            fullName: 'Lee Won (이원)',
            title: '5th Crown Prince of the Korean Imperial Family',
            introduction: 'Direct descendant of Emperor Gojong, HRH Crown Prince Lee Won continues the legacy of the Korean Empire through cultural heritage restoration and global diplomatic exchanges.',
            lineageTitle: 'Royal Lineage',
            lineageDesc: 'The genealogical heritage from Emperor Gojong to the present.',
            activitiesTitle: 'Activities',
            activitiesDesc: 'Cultural heritage restoration and global diplomatic exchanges.',
            messageTitle: 'Welcome Message',
        },
        about: {
            heroTitle: 'About World Royal Academy',
            heroSubtitle: 'Gateway to Royal Heritage',
            visionTitle: 'Vision & Mission',
            visionStatement: 'World Royal Academy: Gateway to Royal Heritage',
            missionStatement: 'Bridging the legacy of Korean royal culture to the world through education, certification, and global partnership.',
            orgTitle: 'Organization',
            orgDesc: 'Our institutional structure ensures excellence across all domains.',
            partnersTitle: 'Global Partners',
            partnersDesc: 'Collaborating with world-class institutions and organizations.',
        },
        education: {
            heroTitle: 'WRA Warrant — Education',
            heroSubtitle: 'K-Heritage Language · K-Literature · K-Studies',
            languageTitle: 'K-Heritage Language',
            languageDesc: 'The Royal Korean Language Institute offers comprehensive Korean language education powered by AI technology.',
            topikTitle: 'AI TOPIK Mock Exam',
            topikDesc: 'Personalized analysis and simulated testing for the Korean Language Proficiency Test.',
            lmsTitle: 'Cloud LMS Platform',
            lmsDesc: 'Video-on-demand, progress tracking, and interactive community features.',
            literatureTitle: 'K-Literature & Writing',
            literatureDesc: 'The Royal Arts & Literature Center provides a four-step creative curriculum.',
            step1: 'Reading',
            step2: 'Questioning',
            step3: 'Discussion',
            step4: 'Step 4: Awarding the Seal and continuous monitoring',
            studiesTitle: 'K-Studies',
            studiesDesc: 'In-depth academic programs focusing on Korean history, culture, and royal heritage.',
            textbooksTitle: 'Published Books & Materials',
            textbooksDesc: '',
        },
        certification: {
            heroTitle: 'WRA Warrant — Certification',
            heroSubtitle: 'K-Royal Warrant · The Royal 33 · Digital Seal',
            warrantTitle: 'K-Royal Warrant',
            warrantDesc: 'A prestigious certification for brands that embody Korean craftsmanship and philosophy — the Korean equivalent of the British Royal Warrant.',
            processApply: 'Application',
            processReview: 'Review & Screening',
            processCertify: 'Certification',
            processRenew: 'Renewal',
            royal33Title: 'The Royal 33',
            royal33Desc: 'An exclusive membership for 33 certified CEOs — premium networking, royal gift selection priority, and global market access.',
            sealTitle: 'Digital Seal (Okiae)',
            sealDesc: 'Blockchain-based authentication for premium branding and value protection.',
        },
        services: {
            heroTitle: 'WRA Warrant — Services',
            heroSubtitle: 'Royal Consulting · Royal Tours',
            consultingTitle: 'Royal Management Consulting',
            consultingDesc: 'Strategic consulting for global expansion and national project development.',
            step1: 'Diagnosis',
            step2: 'Prescription',
            step3: 'Transformation',
            step4: 'Execution',
            step5: 'Feedback',
            toursTitle: 'Royal Tours',
            toursDesc: 'Curated premium tours of national palaces and museums, including the National Palace Museum and Old Korean Legation in the USA.',
        },
        community: {
            heroTitle: 'Community',
            heroSubtitle: 'Connect with World Royal Academy',
            noticesTitle: 'Notices',
            newsletterTitle: 'Newsletter',
            newsletterDesc: 'Subscribe to receive the latest updates from World Royal Academy.',
            qnaTitle: 'Questions & Answers',
            contactTitle: 'Contact Us',
            contactDesc: 'Get in touch with us for inquiries and partnerships.',
            subscribe: 'Subscribe',
            submit: 'Submit',
            namePlaceholder: 'Your Name',
            emailPlaceholder: 'Your Email',
            subjectPlaceholder: 'Subject',
            messagePlaceholder: 'Your Message',
        },
    },
};

export const ko: Dictionary = {
    navbar: {
        crownPrince: '황대손 소개',
        about: 'WRA 소개',
        warrant: 'WRA Warrant',
        community: '커뮤니티',
        adminDashboard: '관리자 대시보드',
        startLogin: '로그인 시작',
        loginSignup: '로그인 / 회원가입',
        profile: '황대손',
        lineage: '계보',
        congratulations: '축사 및 환영사',
        foundingPhilosophy: '설립이념',
        vision: '비전 & 미션',
        coreValuesPage: '핵심가치',
        organization: '조직도',
        textbooksPage: '교재',
        education: '교육',
        kLanguage: '한국어',
        kLiterature: '한국문학',
        kStudies: '한국학',
        tours: '투어',
        membership: '멤버십',
        consulting: '컨설팅',
        notices: '공지',
        newsletter: '뉴스레터 구독',
        qna: 'QnA',
        // Legacy keys
        certification: '인증',
        services: '컨설팅·투어',
        activities: '활동',
        message: '인사말',
        partners: '제휴기관',
        ceoProfile: '대표이사 프로필',
        royalWarrant: 'K-Royal 인증',
        royal33: 'The Royal 33',
        digitalSeal: '디지털 옥새',
        contact: '연락처',
        textbooks: '발간 서적 및 교재',
    },
    home: {
        welcome: '한류 경영의 중심에 오신 것을 환영합니다',
        titleLine1: '세계왕립',
        titleLine2: '아카데미',
        subtitle: '세계왕립아카데미는 대한민국 왕실의 정통 문화유산을 기반으로\n교육, 문화, 비즈니스를 융합하는 글로벌 플랫폼입니다.',
        startApplication: '입학 신청하기',
        exploreCurriculum: '프로그램 둘러보기',
        scrollDown: '아래로 스크롤하여 더 알아보기',
        learnMore: '자세히 보기',
        greeting: {
            title: '인 사 말',
            name: '이사장 황태손  이 원',
            role: '세계왕립아카데미\n대한황실 황태손 이 원',
            message: '**세계왕립아카데미**를 찾아주신 여러분께 깊은 감사의 뜻을 전합니다.\n\n세계는 지금 **문화와 교육**을 통해 국가의 **품격과 정체성**을 새롭게 정의하는 시대에 들어섰습니다. 역사적으로 **왕실**은 국가의 상징이자, 문명과 문명을 연결하고 생산하는 **외교의 축**이었습니다.\n\n세계왕립아카데미는 전통적 가치 위에 **국제 왕실 네트워크**와 연계한 **공공외교 교육 플랫폼**을 지향합니다. 단순한 교류를 넘어, 각국의 역사와 문화, 교육을 존중하며 상호 협력하고 **품격 있는 글로벌 거버넌스** 구축에 뜻을 담고 있습니다.\n\n대한민국의 **K-헤리티지**는 오랜 역사 속에서 형성된 정신과 문화의 결정체입니다. 우리민족은 고대에 **천문사상**과 **수행문화**라는 두 개의 축으로 하여 문화국가로 출발했습니다. 별자리를 연구하는 천문에서 **\'하늘 땅 사람\'**이라는 **천지인 사상**과 당대에 눈으로 관측가능한 태양과 달 그리고 5개의 행성으로 한 **음양오행**의 천문원리를 만들어냈습니다.\n\n수행문화에서 인체탐구의 **한의학**과 음식과 약초는 하나라는 **약식동원**의 원리가 출발했습니다. **선사상**과 **단학**같은 것이 수행문화에서 발원했습니다.\n\n우리는 광대하고 심오한 우리 문화의 원류를 현대적으로 **계승·확장**하여, 국제 사회와 함께하는 **새로운 문명 교류의 장**을 열고자 합니다.\n\n첫째 **\'K-HUMAN(한국인보고서)\'** 비전 아래, 세계왕립아카데미는 국제 왕실 및 전통 문화기관과의 **협력 네트워크 구축**\n\n둘째 **글로벌 청년 리더** 교류 프로그램 운영\n\n셋째 **문화외교** 및 **교육외교** 공동 프로젝트 추진\n\n넷째 **K-헤리티지** 기반 **학문·산업 연계 모델** 확립을 통해 대한민국이 세계 인재·문명 교류의 **중심 국가**로 도약하는데 기여하겠습니다.\n\n이제 왕실의 품격은 권위가 아니라 **책임**에서 비롯됩니다. 통제가 아니라 **자유**를 지향합니다. 세계왕립아카데미는 미래사회를 이끌어갈 책임으로 세계와 협력하며, 독자적인 전통을 기반으로 **미래설계**를 하는 **국제 플랫폼**이 되겠습니다.\n\n과거의 유물이 아니라 정신적인 토대인 **뿌리로써의 전통**과 과학이라는 차가움이 아니라 우리 전통의 정신적인 토대를 이루고 있는 **인본**을 품어 안은 현재가 만나 보다 **아늑하고 따뜻하면서도 발전적인 미래**로 나갈 것을 천명합니다.\n\n**두레**나 **품앗이**처럼 함께 하는 미래를 위하여 여러분의 지속적인 관심과 동참을 부탁드립니다. 감사합니다.',
        },
        coreValues: {
            title: 'WRA 핵심가치',
            subtitle: '세상을 이롭게 하는 한국인의 창조 정신(DNA)',
            hongik: { title: '홍익', desc: '세상을 이롭게 하는\n한국인의 창조 정신(DNA)' },
            wisdom: { title: '지혜', desc: '사유(생각), 성찰(반성),\n각성(깨달음)' },
            peace: { title: '평화', desc: '문화의 다양성,\n포용과 조화' },
            creation: { title: '창조', desc: '서로 다름을 존중하며\n융복합을 통한 문제해결력 증진' },
            heritage: { title: '유산', desc: '평화유산을\n후대에게 계승' },
            harmony: { title: '조화', desc: '문화의 다양성,\n포용과 조화로운 공존' },
            humanity: { title: '인류애', desc: '국경을 넘어 모든 사람을 향한\n연민과 사랑' },
        },
        warrantHighlights: {
            title: 'WRA warrant',
            subtitle: '네 가지 탁월함의 축',
            education: { title: '교육', desc: 'AI 기반 학습을 갖춘 K-Heritage Language, 문예, 한국학 프로그램.' },
            certification: { title: '인증', desc: 'K-Royal Warrant — 한국의 장인정신과 철학의 명예로운 인증.' },
            consulting: { title: '컨설팅', desc: '경영한류컨설팅.' },
            tours: { title: '투어', desc: '프리미엄 문화유산 투어.' },
            membership: { title: '멤버쉽', desc: '프리미엄 멤버쉽 프로그램.' },
        },
        features: {
            blockchain: { title: '블록체인 인증', desc: '모든 학위와 성과는 소울바운드 토큰(SBT)으로 발행되어, 위변조가 불가능한 영구적인 증명을 제공합니다.' },
            network: { title: '글로벌 네트워크', desc: '50개국 이상의 동문 및 석학들과 연결되는 독점적인 탈중앙화 자율 조직(DAO)에 참여할 수 있습니다.' },
            curriculum: { title: '엘리트 커리큘럼', desc: '리더십, 금융, 기술 분야의 세계적인 전문가들로부터 배우는 왕립 아카데미만의 독보적인 교육과정을 경험하세요.' },
        },
        royal33: {
            title: 'The Royal 33',
            subtitle: '대한민국 상위 1%를 위한 멤버십',
            description: '미래를 정의하는 33인의 글로벌 리더를 위한 명예로운 자리입니다. Royal 33 멤버십은 왕립 네트워크에 대한 독점적 접근 권한과 WRA 재단의 거버넌스 권리를 부여합니다.',
            benefit1: '글로벌 네트워킹 및 프라이빗 서밋 초청',
            benefit2: '로열 아이덴티티 및 디지털 주권(Digital Sovereignty) 확보',
            benefit3: 'Web3 프로젝트 및 글로벌 펀드 투자 기회',
            cta: 'Royal 33 멤버십 신청',
        },
        digitalSeal: {
            title: '디지털 옥새 (The Digital Seal)',
            subtitle: '블록체인 기반의 명품 브랜딩 전략',
            description: '"디지털 옥새"는 유산(Heritage)과 기술(Technology)의 완벽한 융합을 상징합니다. 아카데미가 발급하는 모든 인증과 파트너십에 대해 위변조 불가능한 진본성을 보증합니다.',
            feature1: '불멸의 권위 증명 (Immutable Proof)',
            feature2: '글로벌 표준 블록체인 통합',
        },
        ceoProgram: {
            title: 'CEO 황실의 품격',
            subtitle: '리더를 완성하는 고격의 리더십 교육',
            description: '비전가를 위한 최고경영자 과정입니다. 윤리적 거버넌스, 전략적 통찰, 그리고 디지털 혁신이 결합된 "로열 리더십"의 진수를 마스터하십시오.',
            schedule: '다음 기수 모집: 2026년 3월',
            cta: '브로슈어 다운로드',
        },
        news: {
            title: '최신 소식',
            subtitle: '세계왕립아카데미의 최신 소식을 확인하세요',
            viewAll: '전체 보기',
        },
        footer: '© 2026 세계왕립아카데미 (World Royal Academy). All Rights Reserved.',
    },
    footer: {
        description: '대한민국 왕실의 정통 문화유산을 기반으로 교육, 문화, 비즈니스를 융합하는 글로벌 플랫폼.',
        quickLinks: '바로가기',
        contactInfo: '연락처',
        phone: '+82 10-2886-7392',
        email: 'info@wra.academy',
        sns: '@세계왕립아카데미',
        copyright: '© 2026 세계왕립아카데미. All Rights Reserved.',
    },
    pages: {
        crownPrince: {
            heroTitle: '황태손 이원 전하',
            heroSubtitle: '세계왕립아카데미 이사장',
            fullName: '이원 (Lee Won)',
            title: '대한제국 5대 황태손',
            introduction: '고종 황제의 직계 후손으로, 황태손 이원 전하는 문화유산 환수와 글로벌 문화외교를 통해 대한민국 왕실의 유산을 이어가고 계십니다.',
            lineageTitle: '황실 계보',
            lineageDesc: '고종 황제로부터 현재까지의 계보.',
            activitiesTitle: '활동',
            activitiesDesc: '문화유산 환수와 글로벌 문화외교 활동.',
            messageTitle: '인사말',
        },
        about: {
            heroTitle: 'WRA 비전&미션',
            heroSubtitle: 'Gateway to Royal Heritage',
            visionTitle: '비전 · 미션',
            visionStatement: 'World Royal Academy: Gateway to Royal Heritage',
            missionStatement: '교육, 인증, 글로벌 파트너십을 통해 한국 왕실 문화의 유산을 세계에 전파합니다.',
            orgTitle: 'WRA 조직도',
            orgDesc: '모든 영역에서 탁월함을 보장하는 조직 구조.',
            partnersTitle: '글로벌 파트너',
            partnersDesc: '세계 일류 기관 및 단체와의 협력.',
        },
        education: {
            heroTitle: 'WRA 워런트 — 교육',
            heroSubtitle: '한국어 · 왕립문예원 · 한국학(경영한류)',
            languageTitle: '한국어',
            languageDesc: 'AI 기술 기반의 체계적인 한국어 교육을 제공합니다.',
            topikTitle: 'AI TOPIK 모의시험',
            topikDesc: '한국어능력시험을 위한 개인 맞춤형 분석 및 모의고사 시스템.',
            lmsTitle: '클라우드 LMS 플랫폼',
            lmsDesc: 'VOD, 진도 추적, 인터랙티브 커뮤니티 기능.',
            literatureTitle: '한국문학',
            literatureDesc: '-시대의 옷을 갈아입은 문학-',
            step1: '독서 (Reading)',
            step2: '질문 (Questioning)',
            step3: '토론 (Discussion)',
            step4: '4단계: 인증서 수여 및 지속적인 모니터링',
            studiesTitle: '한국학(경영한류)',
            studiesDesc: '한국의 역사, 문화, 유산에 대한 학술 및 연구 프로그램입니다.',
            textbooksTitle: '발간 서적 및 교재',
            textbooksDesc: '',
        },
        certification: {
            heroTitle: 'WRA 워런트 — 인증',
            heroSubtitle: 'K-Royal 인증 · The Royal 33 · 디지털 옥새',
            warrantTitle: 'K-Royal Warrant 인증',
            warrantDesc: '한국의 장인정신과 철학을 체현하는 브랜드에 수여하는 명예 인증 — 영국 Royal Warrant의 한국 버전.',
            processApply: '신청',
            processReview: '심사',
            processCertify: '인증',
            processRenew: '갱신',
            royal33Title: 'The Royal 33',
            royal33Desc: '33인의 인증 CEO를 위한 초프리미엄 네트워킹 — 공식 왕실 선물 우선권, 글로벌 시장 진출 지원.',
            sealTitle: '디지털 옥새 (Digital Seal)',
            sealDesc: '프리미엄 브랜딩과 가치 보호를 위한 블록체인 기반 인증.',
        },
        services: {
            heroTitle: 'WRA 워런트 — 서비스',
            heroSubtitle: '경영한류컨설팅 · K-헤리티지',
            consultingTitle: '경영한류컨설팅',
            consultingDesc: '글로벌 확장 전략과 국가 프로젝트 개발을 위한 전략 컨설팅.',
            step1: '진단 (Diagnosis)',
            step2: '처방 (Prescription)',
            step3: '혁신 (Transformation)',
            step4: '실행 (Execution)',
            step5: '피드백 (Feedback)',
            toursTitle: 'K-헤리티지',
            toursDesc: '국립고궁박물관, 주미대한제국공사관 등 프리미엄 궁궐/박물관 투어.',
        },
        community: {
            heroTitle: '커뮤니티',
            heroSubtitle: '세계왕립아카데미와 함께하세요',
            noticesTitle: '공지사항',
            newsletterTitle: '뉴스레터',
            newsletterDesc: '세계왕립아카데미의 최신 소식을 구독하세요.',
            qnaTitle: '질문과 답변',
            contactTitle: '연락처',
            contactDesc: '문의 및 파트너십에 대해 연락해 주세요.',
            subscribe: '구독하기',
            submit: '전송하기',
            namePlaceholder: '이름',
            emailPlaceholder: '이메일',
            subjectPlaceholder: '제목',
            messagePlaceholder: '메시지 내용',
        },
    },
};
