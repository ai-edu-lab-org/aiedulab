<script lang="ts">
	import VideoCard from '$lib/components/VideoCard.svelte';

	let { data } = $props();
	const Component = $derived(data.component);
</script>

<Component />

{#if data.related.length > 0}
	<section class="mx-auto max-w-3xl px-4 pb-12">
		<h2 class="mb-4 font-heading text-2xl font-bold text-text">Related Videos</h2>
		<div class="grid gap-4">
			{#each data.related as video}
				<VideoCard {video} />
			{/each}
		</div>
	</section>
{/if}
