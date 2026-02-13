<script lang="ts">
	let { title, description }: { title: string; description?: string } = $props();
</script>

<header class="mb-10 text-center">
	<h1 class="font-heading text-4xl font-bold text-text">{title}</h1>
	{#if description}
		<p class="mt-3 text-lg text-text-muted">{description}</p>
	{/if}
</header>
