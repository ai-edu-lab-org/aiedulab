import type { PageLoad } from './$types';
import { loadContent, getAllTags, getByTag } from '$lib/content/loader';
import { ArticleSchema } from '$lib/types';
import type { Article } from '$lib/types';

export const load: PageLoad = ({ params }) => {
	const globs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const articles = loadContent<Article>(globs as any, ArticleSchema);
	const filtered = getByTag(articles, params.tag);
	const allTags = getAllTags(articles);

	return {
		articles: filtered,
		tag: params.tag,
		allTags
	};
};

export const entries = () => {
	const globs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const articles = loadContent<Article>(globs as any, ArticleSchema);
	const tags = getAllTags(articles);
	return tags.map((tag) => ({ tag }));
};
