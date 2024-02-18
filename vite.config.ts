import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { devDependencies } from './package.json';

export default defineConfig({
	plugins: [sveltekit()],
});
