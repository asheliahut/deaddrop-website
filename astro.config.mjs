// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const GITHUB = 'https://github.com/asheliahut/deaddrop';

// https://astro.build/config
export default defineConfig({
	site: 'https://deaddrop.rip',
	trailingSlash: 'ignore',
	integrations: [
		starlight({
			title: 'deaddrop',
			description:
				'Leech a torrent on a server. Encrypt it. Hand it to one client, peer to peer. Leave nothing behind.',
			logo: { src: './src/assets/logo.svg', replacesTitle: false },
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: GITHUB }],
			editLink: {
				baseUrl: 'https://github.com/asheliahut/deaddrop-website/edit/main/',
			},
			lastUpdated: true,
			customCss: [
				'@fontsource-variable/space-grotesk',
				'@fontsource-variable/jetbrains-mono',
				'./src/styles/theme.css',
			],
			expressiveCode: {
				themes: ['github-dark-default', 'github-light-default'],
				styleOverrides: { borderRadius: '0.5rem' },
			},
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0b0d0c' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://deaddrop.rip/og.png' } },
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Introduction', slug: 'docs' },
						{ label: 'Quick start', slug: 'docs/quick-start' },
						{ label: 'Installation', slug: 'docs/installation' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Serving a torrent', slug: 'docs/guides/serving' },
						{ label: 'Fetching files', slug: 'docs/guides/fetching' },
						{ label: 'Resetting a server', slug: 'docs/guides/resetting' },
						{ label: 'Single use, long running', slug: 'docs/guides/wait-for-reset' },
						{ label: 'Notifications', slug: 'docs/guides/notifications' },
						{ label: 'Config file', slug: 'docs/guides/config' },
						{ label: 'Scripting & output', slug: 'docs/guides/scripting' },
						{ label: 'Shell completions', slug: 'docs/guides/completions' },
					],
				},
				{
					label: 'How it works',
					items: [
						{ label: 'Architecture', slug: 'docs/concepts/architecture' },
						{ label: 'No seeding', slug: 'docs/concepts/no-seeding' },
						{ label: 'Encryption', slug: 'docs/concepts/encryption' },
						{ label: 'Threat model', slug: 'docs/concepts/threat-model' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI', slug: 'docs/reference/cli' },
						{ label: 'Config file', slug: 'docs/reference/config' },
						{ label: 'Environment variables', slug: 'docs/reference/environment' },
						{ label: 'Webhook payload', slug: 'docs/reference/webhook' },
					],
				},
				{
					label: 'Project',
					items: [
						{ label: 'Contributing', slug: 'docs/project/contributing' },
						{ label: 'Adding a notifier', slug: 'docs/project/adding-a-notifier' },
						{ label: 'Security policy', slug: 'docs/project/security' },
						{ label: 'GitHub', link: GITHUB, attrs: { target: '_blank' } },
						{ label: 'Releases', link: `${GITHUB}/releases`, attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
