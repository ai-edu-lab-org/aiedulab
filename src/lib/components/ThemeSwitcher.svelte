<script lang="ts">
	import { onMount } from 'svelte';

	const palettes = [
		{ id: 'default', label: 'Classic Blue' },
		{ id: 'forest', label: 'Forest' },
		{ id: 'warm', label: 'Warm Earth' },
		{ id: 'plum', label: 'Plum' },
		{ id: 'ocean', label: 'Ocean' }
	] as const;

	type PaletteId = (typeof palettes)[number]['id'];

	let currentPalette = $state<PaletteId>('default');
	let darkMode = $state(false);
	let open = $state(false);

	onMount(() => {
		const savedPalette = localStorage.getItem('theme-palette') as PaletteId | null;
		const savedDark = localStorage.getItem('theme-dark');
		if (savedPalette && palettes.some((p) => p.id === savedPalette)) {
			currentPalette = savedPalette;
		}
		if (savedDark !== null) {
			darkMode = savedDark === 'true';
		} else {
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		applyTheme();
	});

	function applyTheme() {
		document.documentElement.dataset.palette = currentPalette;
		document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
		localStorage.setItem('theme-palette', currentPalette);
		localStorage.setItem('theme-dark', String(darkMode));
	}

	function setPalette(id: PaletteId) {
		currentPalette = id;
		applyTheme();
	}

	function toggleDark() {
		darkMode = !darkMode;
		applyTheme();
	}

	function toggleOpen() {
		open = !open;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			open = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed right-4 bottom-4 z-50">
	{#if open}
		<div
			class="mb-2 rounded-lg border border-border bg-surface p-3 shadow-lg"
			role="dialog"
			aria-label="Theme settings"
		>
			<div class="mb-3 flex items-center justify-between gap-4">
				<span class="text-xs font-medium text-text-muted">Theme</span>
				<button
					onclick={toggleDark}
					class="flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-xs font-medium text-text transition-colors hover:text-primary"
					aria-label="Toggle dark mode"
				>
					{#if darkMode}
						<svg
							class="h-3.5 w-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						Light
					{:else}
						<svg
							class="h-3.5 w-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
						Dark
					{/if}
				</button>
			</div>
			<div class="flex flex-col gap-1">
				{#each palettes as palette (palette.id)}
					<button
						onclick={() => setPalette(palette.id)}
						class="rounded px-2.5 py-1.5 text-left text-xs transition-colors {currentPalette ===
						palette.id
							? 'bg-primary/10 font-medium text-primary'
							: 'text-text-muted hover:bg-surface-alt hover:text-text'}"
					>
						{palette.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<button
		onclick={toggleOpen}
		class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105"
		aria-label="Open theme settings"
		aria-expanded={open}
	>
		<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
			/>
		</svg>
	</button>
</div>
