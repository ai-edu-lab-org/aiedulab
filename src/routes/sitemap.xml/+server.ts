import { loadContent, getAllTags } from '$lib/content/loader';
import { ArticleSchema, VideoSchema } from '$lib/types';
import type { Article, Video } from '$lib/types';

export const prerender = true;

const SITE_URL = 'https://aiedulab.com';

export async function GET() {
	const articleGlobs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const videoGlobs = import.meta.glob('/src/content/videos/*.md', { eager: true });

	const articles = loadContent<Article>(articleGlobs as any, ArticleSchema);
	const videos = loadContent<Video>(videoGlobs as any, VideoSchema);
	const articleTags = getAllTags(articles);
	const videoTags = getAllTags(videos);

	const pages = [
		{ url: '', priority: '1.0', changefreq: 'weekly' },
		{ url: '/about', priority: '0.8', changefreq: 'monthly' },
		{ url: '/articles', priority: '0.9', changefreq: 'weekly' },
		{ url: '/videos', priority: '0.9', changefreq: 'weekly' },
		{ url: '/tools', priority: '0.8', changefreq: 'monthly' },
		{ url: '/contact', priority: '0.6', changefreq: 'monthly' },
		...articles.map((a) => ({
			url: `/articles/${a.slug}`,
			priority: '0.7',
			changefreq: 'monthly'
		})),
		...videos.map((v) => ({
			url: `/videos/${v.slug}`,
			priority: '0.7',
			changefreq: 'monthly'
		})),
		...articleTags.map((tag) => ({
			url: `/articles/tag/${tag}`,
			priority: '0.5',
			changefreq: 'weekly'
		})),
		...videoTags.map((tag) => ({
			url: `/videos/tag/${tag}`,
			priority: '0.5',
			changefreq: 'weekly'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
		.map(
			(page) => `<url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
		)
		.join('\n  ')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
