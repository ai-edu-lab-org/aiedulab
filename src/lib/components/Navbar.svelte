<script lang="ts">
	import { page } from '$app/state';

	const navLinks = [
		{ href: '/articles', label: 'Articles' },
		{ href: '/videos', label: 'Videos' },
		{ href: '/tools', label: 'Tools' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	let mobileOpen = $state(false);

	function toggleMobile() {
		mobileOpen = !mobileOpen;
	}

	function closeMobile() {
		mobileOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeMobile();
		}
	}

	function isActive(href: string): boolean {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
	<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
		<a href="/" class="font-heading text-xl font-bold text-primary" onclick={closeMobile}>
			AI Education Lab
		</a>

		<!-- Desktop nav -->
		<ul class="hidden gap-6 sm:flex">
			{#each navLinks as { href, label } (href)}
				<li>
					<a
						{href}
						class="text-sm font-medium transition-colors hover:text-primary {isActive(href)
							? 'text-primary'
							: 'text-text-muted'}"
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile menu button -->
		<button
			class="sm:hidden"
			aria-expanded={mobileOpen}
			aria-controls="mobile-menu"
			aria-label="Toggle navigation menu"
			onclick={toggleMobile}
		>
			<svg
				class="h-6 w-6 text-text"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				{#if mobileOpen}
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				{:else}
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<ul id="mobile-menu" class="border-t border-border px-4 pb-4 sm:hidden">
			{#each navLinks as { href, label } (href)}
				<li>
					<a
						{href}
						class="block py-2 text-sm font-medium transition-colors hover:text-primary {isActive(
							href
						)
							? 'text-primary'
							: 'text-text-muted'}"
						onclick={closeMobile}
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</nav>
