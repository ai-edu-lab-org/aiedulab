<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		status = 'sending';
		errorMessage = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Failed to send message');
			}

			status = 'success';
			name = '';
			email = '';
			message = '';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong';
		}
	}
</script>

<svelte:head>
	<title>Contact - AI Education Lab</title>
	<meta
		name="description"
		content="Get in touch with AI Education Lab. Questions, suggestions, or collaboration inquiries welcome."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12">
	<PageHeader
		title="Contact"
		description="Questions, suggestions, or collaboration inquiries? We'd love to hear from you."
	/>

	<div class="mx-auto max-w-xl">
		{#if status === 'success'}
			<div class="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
				<p class="font-heading text-lg font-semibold text-green-800">Message sent!</p>
				<p class="mt-2 text-sm text-green-700">
					Thank you for reaching out. We'll get back to you as soon as possible.
				</p>
				<button
					onclick={() => (status = 'idle')}
					class="mt-4 text-sm font-medium text-primary hover:text-primary-dark"
				>
					Send another message
				</button>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="name" class="block text-sm font-medium text-text">Name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						class="mt-1 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						placeholder="Your name"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-text">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="mt-1 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						placeholder="you@example.com"
					/>
				</div>

				<div>
					<label for="message" class="block text-sm font-medium text-text">Message</label>
					<textarea
						id="message"
						bind:value={message}
						required
						rows={5}
						class="mt-1 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
						placeholder="How can we help?"
					></textarea>
				</div>

				{#if status === 'error'}
					<p class="text-sm text-red-600">{errorMessage}</p>
				{/if}

				<button
					type="submit"
					disabled={status === 'sending'}
					class="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
				>
					{status === 'sending' ? 'Sending...' : 'Send Message'}
				</button>
			</form>
		{/if}
	</div>
</div>
