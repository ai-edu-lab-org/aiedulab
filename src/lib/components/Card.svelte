<script lang="ts">
	import type { Snippet } from 'svelte';

	let { href, children }: { href: string; children: Snippet } = $props();
</script>

<a
	{href}
	class="block rounded-lg border border-border bg-surface p-5 transition-shadow hover:shadow-md"
>
	{@render children()}
</a>
