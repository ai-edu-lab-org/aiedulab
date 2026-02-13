import type { PageLoad } from './$types';
import { loadContent, getRelated } from '$lib/content/loader';
import { VideoSchema } from '$lib/types';
import type { Video } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const globs = import.meta.glob('/src/content/videos/*.md', { eager: true });
	const videos = loadContent<Video>(globs as any, VideoSchema);
	const video = videos.find((v) => v.slug === params.slug);

	if (!video) {
		error(404, 'Video not found');
	}

	const path = `/src/content/videos/${params.slug}.md`;
	const module = globs[path] as any;

	if (!module) {
		error(404, 'Video not found');
	}

	const related = getRelated(video, videos);

	return {
		video,
		component: module.default,
		related
	};
};
