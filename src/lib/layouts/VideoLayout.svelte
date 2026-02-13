<script lang="ts">
	import TagList from '$lib/components/TagList.svelte';

	let { title, date, description, embedUrl, duration, tags, timestamps, children } = $props();

	const formattedDate = $derived(
		new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>{title} | AI Education Lab</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-12">
	<header class="mb-8">
		<h1 class="font-heading text-4xl leading-tight font-bold text-text">{title}</h1>
		<div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
			<time datetime={date}>{formattedDate}</time>
			{#if duration}
				<span aria-hidden="true">&middot;</span>
				<span>{duration}</span>
			{/if}
		</div>
	</header>

	<div class="relative mb-8 aspect-video w-full overflow-hidden rounded-lg bg-black">
		<iframe
			src={embedUrl}
			{title}
			class="absolute inset-0 h-full w-full"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>
	</div>

	{#if timestamps?.length}
		<nav class="mb-8 rounded-lg border border-border bg-surface-alt p-4" aria-label="Timestamps">
			<h2 class="mb-3 font-heading text-lg font-semibold text-text">Timestamps</h2>
			<ul class="space-y-1 text-sm">
				{#each timestamps as { time, label } (time)}
					<li class="flex gap-3">
						<span class="font-mono text-primary">{time}</span>
						<span class="text-text-muted">{label}</span>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}

	<article class="prose prose-lg max-w-none">
		{@render children()}
	</article>

	{#if tags?.length}
		<footer class="mt-10 border-t border-border pt-6">
			<TagList {tags} basePath="/videos/tag" />
		</footer>
	{/if}
</div>
