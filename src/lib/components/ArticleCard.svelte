<script lang="ts">
	import type { Article } from '$lib/types';
	import Card from './Card.svelte';
	import TagList from './TagList.svelte';

	let { article }: { article: Article } = $props();

	const formatted = $derived(
		new Date(article.date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<Card href={`/articles/${article.slug}`}>
	<h3 class="font-heading text-lg font-semibold text-text">{article.title}</h3>
	<p class="mt-1 text-sm text-text-muted">
		{formatted}
		{#if article.readingTime}
			<span class="mx-1">&middot;</span>
			{article.readingTime} min read
		{/if}
	</p>
	<p class="mt-2 text-sm text-text-muted">{article.description}</p>
	{#if article.tags.length > 0}
		<div class="mt-3">
			<TagList tags={article.tags} basePath="/articles/tag" />
		</div>
	{/if}
</Card>
