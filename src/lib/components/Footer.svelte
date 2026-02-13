<script lang="ts">
	const navLinks = [
		{ href: '/articles', label: 'Articles' },
		{ href: '/videos', label: 'Videos' },
		{ href: '/tools', label: 'Tools' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-surface-alt">
	<div class="mx-auto max-w-5xl px-4 py-10">
		<div class="flex flex-col items-center gap-4 text-center">
			<div>
				<p class="font-heading text-lg font-bold text-primary">AI Education Lab</p>
				<p class="text-sm text-text-muted">AI literacy resources for teacher educators</p>
			</div>

			<nav aria-label="Footer navigation">
				<ul class="flex gap-6">
					{#each navLinks as { href, label } (href)}
						<li>
							<a {href} class="text-sm text-text-muted transition-colors hover:text-primary">
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<p class="text-xs text-text-muted">&copy; {year} AI Education Lab. All rights reserved.</p>
		</div>
	</div>
</footer>
