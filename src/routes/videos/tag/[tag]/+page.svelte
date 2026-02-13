<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let { data } = $props();
</script>

<div class="mx-auto max-w-3xl px-4 py-12">
	<PageHeader title="Videos tagged: {data.tag}" />

	<div class="mb-8 flex flex-wrap gap-1.5">
		{#each data.allTags as tag}
			<Badge label={tag} href={`/videos/tag/${tag}`} />
		{/each}
	</div>

	<div class="grid gap-4">
		{#each data.videos as video}
			<VideoCard {video} />
		{/each}
	</div>

	<div class="mt-8">
		<a href="/videos" class="text-sm font-medium text-primary hover:text-primary-dark">
			&larr; All videos
		</a>
	</div>
</div>
