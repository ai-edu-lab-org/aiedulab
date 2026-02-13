<script lang="ts">
	let { title, children } = $props();
</script>

<svelte:head>
	<title>{title} | AI Education Lab</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-10 font-heading text-4xl font-bold text-text">{title}</h1>
	<div class="prose prose-lg max-w-none">
		{@render children()}
	</div>
</div>
