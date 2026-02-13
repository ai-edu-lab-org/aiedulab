<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} - AI Education Lab</title>
</svelte:head>

<div class="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
	<p class="font-heading text-6xl font-bold text-primary">{page.status}</p>
	<h1 class="mt-4 font-heading text-2xl font-bold text-text">
		{#if page.status === 404}
			Page not found
		{:else}
			Something went wrong
		{/if}
	</h1>
	<p class="mt-3 text-text-muted">
		{#if page.status === 404}
			The page you are looking for does not exist or has been moved.
		{:else if page.error?.message}
			{page.error.message}
		{:else}
			An unexpected error occurred. Please try again.
		{/if}
	</p>
	<a
		href="/"
		class="mt-8 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
	>
		Back to Home
	</a>
</div>
