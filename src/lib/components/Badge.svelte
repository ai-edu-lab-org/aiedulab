<script lang="ts">
	let { label, href }: { label: string; href?: string } = $props();
</script>

{#if href}
	<a
		{href}
		class="inline-block rounded-full bg-primary-light/20 px-2.5 py-0.5 text-xs font-medium text-primary-dark transition-colors hover:bg-primary-light/40"
	>
		{label}
	</a>
{:else}
	<span
		class="inline-block rounded-full bg-primary-light/20 px-2.5 py-0.5 text-xs font-medium text-primary-dark"
	>
		{label}
	</span>
{/if}
