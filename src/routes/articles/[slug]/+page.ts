import type { PageLoad } from './$types';
import { loadContent, getRelated } from '$lib/content/loader';
import { ArticleSchema } from '$lib/types';
import type { Article } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const globs = import.meta.glob('/src/content/articles/*.md', { eager: true });
	const articles = loadContent<Article>(globs as any, ArticleSchema);
	const article = articles.find((a) => a.slug === params.slug);

	if (!article) {
		error(404, 'Article not found');
	}

	const path = `/src/content/articles/${params.slug}.md`;
	const module = globs[path] as any;

	if (!module) {
		error(404, 'Article not found');
	}

	const related = getRelated(article, articles);

	return {
		article,
		component: module.default,
		related
	};
};
