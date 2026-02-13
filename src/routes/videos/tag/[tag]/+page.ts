import type { PageLoad } from './$types';
import { loadContent, getAllTags, getByTag } from '$lib/content/loader';
import { VideoSchema } from '$lib/types';
import type { Video } from '$lib/types';

export const load: PageLoad = ({ params }) => {
	const globs = import.meta.glob('/src/content/videos/*.md', { eager: true });
	const videos = loadContent<Video>(globs as any, VideoSchema);
	const filtered = getByTag(videos, params.tag);
	const allTags = getAllTags(videos);

	return {
		videos: filtered,
		tag: params.tag,
		allTags
	};
};

export const entries = () => {
	const globs = import.meta.glob('/src/content/videos/*.md', { eager: true });
	const videos = loadContent<Video>(globs as any, VideoSchema);
	const tags = getAllTags(videos);
	return tags.map((tag) => ({ tag }));
};
