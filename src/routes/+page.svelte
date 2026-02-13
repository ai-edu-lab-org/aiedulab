<script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import VideoCard from '$lib/components/VideoCard.svelte';

	let { data } = $props();

	const hasArticles = $derived(data.featuredArticles.length > 0 || data.recentArticles.length > 0);
	const hasVideos = $derived(data.featuredVideos.length > 0 || data.recentVideos.length > 0);
	const displayedArticles = $derived(
		data.featuredArticles.length > 0 ? data.featuredArticles : data.recentArticles
	);
	const displayedVideos = $derived(
		data.featuredVideos.length > 0 ? data.featuredVideos : data.recentVideos
	);
</script>

<svelte:head>
	<title>AI Education Lab - AI Literacy Resources for Teacher Educators</title>
	<meta
		name="description"
		content="Curated AI literacy resources for teacher educators at the university and research level. Articles, videos, and tools to help you prepare the next generation of K-12 teachers."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-16">
	<!-- Hero section -->
	<section class="mb-20 text-center">
		<h1 class="font-heading text-5xl font-bold text-text">AI Education Lab</h1>
		<p class="mt-4 text-xl text-primary">AI Literacy Resources for Teacher Educators</p>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
			Curated resources to help teacher educators at the university and research level integrate AI
			literacy into their programs. Practical guidance grounded in pedagogy, not hype.
		</p>
		<div class="mt-8 flex justify-center gap-4">
			<a
				href="/articles"
				class="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
			>
				Browse Articles
			</a>
			<a
				href="/videos"
				class="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
			>
				Watch Videos
			</a>
		</div>
	</section>

	<!-- Featured Articles -->
	{#if hasArticles}
		<section class="mb-16">
			<div class="mb-6 flex items-baseline justify-between">
				<h2 class="font-heading text-2xl font-bold text-text">Featured Articles</h2>
				<a href="/articles" class="text-sm font-medium text-primary hover:text-primary-dark">
					View all &rarr;
				</a>
			</div>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each displayedArticles as article (article.slug)}
					<ArticleCard {article} />
				{/each}
			</div>
		</section>
	{/if}

	<!-- Featured Videos -->
	{#if hasVideos}
		<section>
			<div class="mb-6 flex items-baseline justify-between">
				<h2 class="font-heading text-2xl font-bold text-text">Featured Videos</h2>
				<a href="/videos" class="text-sm font-medium text-primary hover:text-primary-dark">
					View all &rarr;
				</a>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				{#each displayedVideos as video (video.slug)}
					<VideoCard {video} />
				{/each}
			</div>
		</section>
	{/if}
</div>
