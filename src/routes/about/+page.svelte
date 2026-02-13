<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>About - AI Education Lab</title>
	<meta
		name="description"
		content="About AI Education Lab: bridging the gap between AI advancement and teacher education. Resources for teacher educators at the PhD, university, and research level."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12">
	<PageHeader
		title="About AI Education Lab"
		description="Bridging the gap between AI advancement and teacher education."
	/>

	<!-- Mission -->
	<section class="mx-auto mb-12 max-w-3xl">
		<h2 class="font-heading text-2xl font-bold text-text">Our Mission</h2>
		<div class="mt-4 space-y-4 text-text-muted">
			<p>
				AI is transforming every field it touches, and education is no exception. Yet most resources
				on AI in education target classroom teachers directly, overlooking the educators who prepare
				them.
			</p>
			<p>
				AI Education Lab exists to serve <strong class="text-text">teacher educators</strong> -- the researchers,
				professors, and program leaders at universities who shape how the next generation of K-12 teachers
				understands and uses AI. We provide curated articles, videos, and tool recommendations grounded
				in pedagogy, not hype.
			</p>
			<p>
				Our goal is practical: help you make informed decisions about integrating AI literacy into
				your teacher preparation programs, with an emphasis on critical thinking, ethical awareness,
				and evidence-based practice.
			</p>
		</div>
	</section>

	<!-- Who This Is For -->
	<section class="mx-auto mb-12 max-w-3xl">
		<h2 class="font-heading text-2xl font-bold text-text">Who This Is For</h2>
		<div class="mt-4 space-y-4 text-text-muted">
			<p>
				AI Education Lab is primarily designed for <strong class="text-text"
					>teacher educators at the PhD, university, and research level</strong
				> who are responsible for preparing K-12 teachers. This includes:
			</p>
			<ul class="ml-6 list-disc space-y-2">
				<li>Faculty in colleges of education developing AI literacy curricula</li>
				<li>Researchers studying the intersection of AI and teacher preparation</li>
				<li>Program coordinators integrating AI tools into field experiences</li>
				<li>Doctoral students exploring AI in education for their research</li>
			</ul>
			<p>
				K-12 teachers who discover these resources through university programs will also find value
				here, but the depth and framing are designed for those who train teachers.
			</p>
		</div>
	</section>

	<!-- Tools link -->
	<section class="mx-auto max-w-3xl">
		<h2 class="font-heading text-2xl font-bold text-text">Recommended Tools</h2>
		<p class="mt-4 text-text-muted">
			We maintain a curated list of AI tools evaluated for cost, privacy, and relevance to teacher
			education.
		</p>
		<a
			href="/tools"
			class="mt-4 inline-block text-sm font-medium text-primary hover:text-primary-dark"
		>
			Browse our recommended tools &rarr;
		</a>
	</section>
</div>
