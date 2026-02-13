import type { PageLoad } from './$types';
import { loadContent } from '$lib/content/loader';
import { ArticleSchema, VideoSchema } from '$lib/types';
import type { Article, Video } from '$lib/types';

export const load: PageLoad = () => {
	const articleGlobs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const videoGlobs = import.meta.glob('/src/content/videos/*.md', { eager: true });

	const articles = loadContent<Article>(articleGlobs as any, ArticleSchema);
	const videos = loadContent<Video>(videoGlobs as any, VideoSchema);

	return {
		featuredArticles: articles.filter((a) => a.featured),
		featuredVideos: videos.filter((v) => v.featured),
		recentArticles: articles.slice(0, 3),
		recentVideos: videos.slice(0, 2)
	};
};
