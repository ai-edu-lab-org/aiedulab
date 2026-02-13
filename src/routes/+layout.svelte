<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main id="main-content" class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>

<ThemeSwitcher />
