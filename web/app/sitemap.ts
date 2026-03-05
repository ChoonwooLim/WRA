import { MetadataRoute } from 'next';

const BASE_URL = 'https://xn--989ao0kixfkpc53jxpgt2bji2a.org';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Main pages
    const mainPages = [
        { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
        { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/about/ceo', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/about/core-values', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/about/founding-philosophy', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/about/organization', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/about/partners', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/about/textbooks', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Crown Prince pages
    const crownPrincePages = [
        { url: '/crown-prince', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/crown-prince/activities', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/crown-prince/lineage', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/crown-prince/message', priority: 0.8, changeFrequency: 'monthly' as const },
    ];

    // Warrant pages
    const warrantPages = [
        { url: '/warrant', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/warrant/education', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/warrant/education/culture', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/warrant/education/language', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/warrant/education/studies', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/warrant/membership', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/warrant/consulting', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/warrant/tours', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Education pages
    const educationPages = [
        { url: '/education/books', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/education/language', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/education/literature', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/education/studies', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Certification pages
    const certificationPages = [
        { url: '/certification', priority: 0.8, changeFrequency: 'monthly' as const },
        { url: '/certification/digital-seal', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/certification/royal33', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Services pages
    const servicePages = [
        { url: '/services/consulting', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/services/tours', priority: 0.7, changeFrequency: 'monthly' as const },
    ];

    // Community pages
    const communityPages = [
        { url: '/community/notices', priority: 0.6, changeFrequency: 'weekly' as const },
        { url: '/community/gallery', priority: 0.6, changeFrequency: 'weekly' as const },
        { url: '/community/free-board', priority: 0.5, changeFrequency: 'weekly' as const },
        { url: '/community/qna', priority: 0.5, changeFrequency: 'weekly' as const },
        { url: '/community/newsletter', priority: 0.5, changeFrequency: 'monthly' as const },
        { url: '/community/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    ];

    // Verify page
    const verifyPages = [
        { url: '/verify', priority: 0.6, changeFrequency: 'monthly' as const },
    ];

    const allPages = [
        ...mainPages,
        ...crownPrincePages,
        ...warrantPages,
        ...educationPages,
        ...certificationPages,
        ...servicePages,
        ...communityPages,
        ...verifyPages,
    ];

    return allPages.map((page) => ({
        url: `${BASE_URL}${page.url}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));
}
