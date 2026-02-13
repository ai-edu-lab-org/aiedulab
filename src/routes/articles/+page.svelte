<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import anime from 'animejs';

	let { data } = $props();

	let selectedTag = $state<string | null>(null);

	const filteredArticles = $derived(
		selectedTag ? data.articles.filter((a) => a.tags.includes(selectedTag!)) : data.articles
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
	<title>Articles - AI Education Lab</title>
	<meta
		name="description"
		content="Articles on AI literacy for teacher educators. Practical guidance on integrating AI into teacher preparation programs."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12">
	<PageHeader
		title="Articles"
		description="Practical guidance on AI literacy for teacher educators at the university and research level."
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

	{#if filteredArticles.length > 0}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" use:animateGrid={filteredArticles}>
			{#each filteredArticles as article (article.slug)}
				<ArticleCard {article} />
			{/each}
		</div>
	{:else}
		<p class="text-center text-text-muted">No articles match this filter.</p>
	{/if}
</div>
