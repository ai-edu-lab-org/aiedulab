<script lang="ts">
	import type { Video } from '$lib/types';
	import Card from './Card.svelte';
	import Badge from './Badge.svelte';
	import TagList from './TagList.svelte';

	let { video }: { video: Video } = $props();

	const formatted = $derived(
		new Date(video.date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<Card href={`/videos/${video.slug}`}>
	<div class="flex items-start justify-between gap-2">
		<h3 class="font-heading text-lg font-semibold text-text">{video.title}</h3>
		<Badge label={video.duration} />
	</div>
	<p class="mt-1 text-sm text-text-muted">{formatted}</p>
	<p class="mt-2 text-sm text-text-muted">{video.description}</p>
	{#if video.tags.length > 0}
		<div class="mt-3">
			<TagList tags={video.tags} basePath="/videos/tag" />
		</div>
	{/if}
</Card>
