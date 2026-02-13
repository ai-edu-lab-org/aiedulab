import type { PageLoad } from './$types';
import { loadContent, getAllTags } from '$lib/content/loader';
import { ArticleSchema } from '$lib/types';
import type { Article } from '$lib/types';

export const load: PageLoad = () => {
	const globs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const articles = loadContent<Article>(globs as any, ArticleSchema);
	const tags = getAllTags(articles);
	return { articles, tags };
};
