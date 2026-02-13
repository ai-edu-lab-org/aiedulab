import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			layout: {
				article: path.resolve(__dirname, './src/lib/layouts/ArticleLayout.svelte'),
				video: path.resolve(__dirname, './src/lib/layouts/VideoLayout.svelte'),
				_: path.resolve(__dirname, './src/lib/layouts/DefaultLayout.svelte')
			}
		})
	],
	kit: {
		adapter: adapter({ strict: false }),
		prerender: {
			entries: ['*']
		}
	}
};

export default config;
