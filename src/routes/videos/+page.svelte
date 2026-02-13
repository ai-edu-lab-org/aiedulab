<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';
	import anime from 'animejs';

	let { data } = $props();

	let selectedTag = $state<string | null>(null);

	const filteredVideos = $derived(
		selectedTag ? data.videos.filter((v) => v.tags.includes(selectedTag!)) : data.videos
	);

	function animateGrid(node: HTMLDivElement) {
		function run() {
			anime({
				targets: node.children,
				opacity: [0, 1],
				translateY: [12, 0],
				delay: anime.stagger(50),
				duration: 300,
				easing: 'easeOutCubic'
			});
		}
		run();
		return {
			update() {
				requestAnimationFrame(run);
			}
		};
	}

	function toggleTag(tag: string) {
		selectedTag = selectedTag === tag ? null : tag;
	}
</script>

<svelte:head>
	<title>Videos - AI Education Lab</title>
	<meta
		name="description"
		content="Video resources on AI literacy for teacher educators. Demonstrations, lectures, and practical walkthroughs."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12">
	<PageHeader
		title="Videos"
		description="Video resources on AI in education -- demonstrations, lectures, and practical walkthroughs."
	/>

	{#if data.tags.length > 0}
		<div class="mb-8 flex flex-wrap justify-center gap-1.5">
			{#each data.tags as tag (tag)}
				<button
					onclick={() => toggleTag(tag)}
					class="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors {selectedTag ===
					tag
						? 'bg-primary text-white'
						: 'bg-primary-light/20 text-primary-dark hover:bg-primary-light/40'}"
				>
					{tag}
				</button>
			{/each}
			{#if selectedTag}
				<button
					onclick={() => (selectedTag = null)}
					class="inline-block rounded-full bg-border px-2.5 py-0.5 text-xs font-medium text-text-muted transition-colors hover:bg-text-muted/20"
				>
					Clear
				</button>
			{/if}
		</div>
	{/if}

	{#if filteredVideos.length > 0}
		<div class="grid gap-4 sm:grid-cols-2" use:animateGrid={filteredVideos}>
			{#each filteredVideos as video (video.slug)}
				<VideoCard {video} />
			{/each}
		</div>
	{:else}
		<p class="text-center text-text-muted">No videos match this filter.</p>
	{/if}
</div>
