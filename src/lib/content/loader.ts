import type { z } from 'zod';

type ContentModule = {
	metadata: Record<string, unknown>;
};

export function loadContent<T>(glob: Record<string, ContentModule>, schema: z.ZodType<T>): T[] {
	return Object.entries(glob)
		.map(([path, module]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			const parsed = schema.safeParse({ ...module.metadata, slug });
			if (!parsed.success) {
				console.error(`Invalid frontmatter in ${path}:`, parsed.error.issues);
				return null;
			}
			return parsed.data;
		})
		.filter((item): item is T => item !== null)
		.filter((item) => !(item as Record<string, unknown>).draft)
		.sort((a, b) => {
			const aDate = (a as Record<string, unknown>).date as string;
			const bDate = (b as Record<string, unknown>).date as string;
			return new Date(bDate).getTime() - new Date(aDate).getTime();
		});
}

export function getAllTags<T extends { tags: string[] }>(items: T[]): string[] {
	const tagSet = new Set(items.flatMap((item) => item.tags));
	return [...tagSet].sort();
}

export function getByTag<T extends { tags: string[] }>(items: T[], tag: string): T[] {
	return items.filter((item) => item.tags.includes(tag));
}

export function getRelated<T extends { tags: string[]; slug: string }>(
	item: T,
	allItems: T[],
	limit = 3
): T[] {
	return allItems
		.filter((other) => other.slug !== item.slug)
		.map((other) => ({
			item: other,
			similarity: item.tags.filter((t) => other.tags.includes(t)).length
		}))
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, limit)
		.map((x) => x.item);
}
