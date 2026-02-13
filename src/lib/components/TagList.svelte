<script lang="ts">
	import Badge from './Badge.svelte';

	let { tags, basePath }: { tags: string[]; basePath: string } = $props();
</script>

<div class="flex flex-wrap gap-1.5">
	{#each tags as tag}
		<Badge label={tag} href={`${basePath}/${tag}`} />
	{/each}
</div>
