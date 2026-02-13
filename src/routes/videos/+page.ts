import type { PageLoad } from './$types';
import { loadContent, getAllTags } from '$lib/content/loader';
import { VideoSchema } from '$lib/types';
import type { Video } from '$lib/types';

export const load: PageLoad = () => {
	const globs = import.meta.glob('/src/content/videos/*.md', { eager: true });
	const videos = loadContent<Video>(globs as any, VideoSchema);
	const tags = getAllTags(videos);
	return { videos, tags };
};
