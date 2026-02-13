import { loadContent } from '$lib/content/loader';
import { ArticleSchema, VideoSchema } from '$lib/types';
import type { Article, Video } from '$lib/types';

export const prerender = true;

const SITE_URL = 'https://aiedulab.com';
const SITE_TITLE = 'AI Education Lab';
const SITE_DESCRIPTION =
	'AI literacy resources for teacher educators at the university and research level.';

export async function GET() {
	const articleGlobs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const videoGlobs = import.meta.glob('/src/content/videos/*.md', { eager: true });

	const articles = loadContent<Article>(articleGlobs as any, ArticleSchema);
	const videos = loadContent<Video>(videoGlobs as any, VideoSchema);

	const items = [
		...articles.map((a) => ({
			title: a.title,
			description: a.description,
			link: `${SITE_URL}/articles/${a.slug}`,
			date: a.date
		})),
		...videos.map((v) => ({
			title: v.title,
			description: v.description,
			link: `${SITE_URL}/videos/${v.slug}`,
			date: v.date
		}))
	].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items
			.map(
				(item) => `<item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
			)
			.join('\n    ')}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
