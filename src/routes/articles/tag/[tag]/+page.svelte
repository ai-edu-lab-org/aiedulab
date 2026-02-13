<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import ArticleCard from '$lib/components/ArticleCard.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let { data } = $props();
</script>

<div class="mx-auto max-w-3xl px-4 py-12">
	<PageHeader title="Articles tagged: {data.tag}" />

	<div class="mb-8 flex flex-wrap gap-1.5">
		{#each data.allTags as tag}
			<Badge label={tag} href={`/articles/tag/${tag}`} />
		{/each}
	</div>

	<div class="grid gap-4">
		{#each data.articles as article}
			<ArticleCard {article} />
		{/each}
	</div>

	<div class="mt-8">
		<a href="/articles" class="text-sm font-medium text-primary hover:text-primary-dark">
			&larr; All articles
		</a>
	</div>
</div>
