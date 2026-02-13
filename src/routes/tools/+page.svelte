<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tools - AI Education Lab</title>
	<meta
		name="description"
		content="Curated AI tools for teacher educators. Classroom analysis, AI assistants, and development tools evaluated for educational use."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12">
	<PageHeader
		title="Tools"
		description="A curated selection of AI tools evaluated for educational use. Each tool is assessed for cost, privacy, and relevance to teacher education."
	/>

	{#each data.grouped as { group, tools } (group)}
		<section class="mb-12">
			<h2 class="mb-6 font-heading text-2xl font-bold text-text">{group}</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each tools as tool (tool.name)}
					<a
						href={tool.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-md"
					>
						<div class="flex items-start justify-between gap-2">
							<h3 class="font-heading text-lg font-semibold text-text">{tool.name}</h3>
							<div class="flex shrink-0 gap-1.5">
								<Badge label={tool.cost} />
								<Badge
									label={tool.privacy === 'high'
										? 'high privacy'
										: tool.privacy === 'moderate'
											? 'mod. privacy'
											: 'low privacy'}
								/>
							</div>
						</div>
						<p class="mt-1 text-xs text-text-muted">{tool.category}</p>
						<p class="mt-2 text-sm text-text-muted">{tool.description}</p>
						{#if tool.ferpaCompliant || tool.coppaCompliant}
							<div class="mt-3 flex gap-1.5">
								{#if tool.ferpaCompliant}
									<Badge label="FERPA" />
								{/if}
								{#if tool.coppaCompliant}
									<Badge label="COPPA" />
								{/if}
							</div>
						{/if}
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>
