<script lang="ts">
	import TagList from '$lib/components/TagList.svelte';

	let { title, date, updated, description, tags, author, readingTime, children } = $props();

	const formattedDate = $derived(
		new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	const formattedUpdated = $derived(
		updated
			? new Date(updated).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: null
	);
</script>

<svelte:head>
	<title>{title} | AI Education Lab</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-12">
	<header class="mb-10">
		<h1 class="font-heading text-4xl leading-tight font-bold text-text">{title}</h1>
		<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
			{#if author}
				<span>{author}</span>
				<span aria-hidden="true">&middot;</span>
			{/if}
			<time datetime={date}>{formattedDate}</time>
			{#if formattedUpdated}
				<span aria-hidden="true">&middot;</span>
				<span>Updated {formattedUpdated}</span>
			{/if}
			{#if readingTime}
				<span aria-hidden="true">&middot;</span>
				<span>{readingTime} min read</span>
			{/if}
		</div>
	</header>

	<article class="prose prose-lg max-w-none">
		{@render children()}
	</article>

	{#if tags?.length}
		<footer class="mt-10 border-t border-border pt-6">
			<TagList {tags} basePath="/articles/tag" />
		</footer>
	{/if}
</div>
