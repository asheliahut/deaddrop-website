// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import { OG_IMAGE_ALT } from './src/site.ts';

const GITHUB = 'https://github.com/asheliahut/deaddrop';

// https://astro.build/config
export default defineConfig({
	site: 'https://deaddrop.rip',
	trailingSlash: 'ignore',
	integrations: [
		starlight({
			title: 'deaddrop',
			description:
				'Leech a torrent, or take any file, on a server. Hand it to one client over an encrypted peer-to-peer link. Leave nothing behind.',
			logo: { src: './src/assets/logo.svg', replacesTitle: false },
			favicon: '/favicon.svg',
			social: [{ icon: 'github', label: 'GitHub', href: GITHUB }],
			editLink: {
				baseUrl: 'https://github.com/asheliahut/deaddrop-website/edit/main/',
			},
			lastUpdated: true,
			// Generates /llms.txt, /llms-full.txt and /llms-small.txt: plain-text
			// copies of the docs for AI assistants and answer engines.
			plugins: [
				starlightLlmsTxt({
					projectName: 'deaddrop',
					details:
						'deaddrop is a single-binary CLI. `deaddrop serve` runs on a server and prints a ticket; `deaddrop fetch <ticket>` runs on the client. Transfers use iroh (QUIC, TLS 1.3, NAT traversal, relay fallback). Torrents are leeched with uploads disabled, so nothing is ever seeded.',
					promote: ['docs', 'docs/quick-start', 'docs/installation'],
					demote: ['docs/project/**', 'docs/upgrading-from-1'],
					optionalLinks: [
						{ label: 'GitHub repository', url: GITHUB, description: 'Source code, issues and binaries' },
						{ label: 'Changelog', url: `${GITHUB}/blob/main/CHANGELOG.md`, description: 'Every release and what changed' },
					],
				}),
			],
			// The version bar (current release + link to what's new since the
			// previous release) sits in Starlight's Banner slot on every page.
			// Head wraps Starlight's default to add noindex on the 404 page.
			components: { Banner: './src/components/VersionBar.astro', Head: './src/components/Head.astro' },
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
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: OG_IMAGE_ALT } },
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'application/rss+xml', title: 'deaddrop releases', href: '/releases.xml' },
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Introduction', slug: 'docs' },
						{ label: 'Quick start', slug: 'docs/quick-start' },
						{ label: 'Installation', slug: 'docs/installation' },
						{ label: 'Troubleshooting', slug: 'docs/troubleshooting' },
						{ label: "What's new in 2.1", slug: 'docs/whats-new', badge: { text: 'New', variant: 'success' } },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Serving files', slug: 'docs/guides/serving' },
						{ label: 'Fetching files', slug: 'docs/guides/fetching' },
						{ label: 'Resetting a server', slug: 'docs/guides/resetting' },
						{ label: 'Single use, long running', slug: 'docs/guides/wait-for-reset' },
						{ label: 'Allowing specific clients', slug: 'docs/guides/allow' },
						{ label: 'Expiring tickets', slug: 'docs/guides/expiring' },
						{ label: 'Notifications', slug: 'docs/guides/notifications' },
						{ label: 'Setting up notifiers', slug: 'docs/guides/notifier-setup' },
						{ label: 'Encrypting at rest', slug: 'docs/guides/encrypting' },
						{ label: 'Connections & relays', slug: 'docs/guides/relays' },
						{ label: 'Config file', slug: 'docs/guides/config' },
						{ label: 'Progress & logging', slug: 'docs/guides/progress' },
						{ label: 'Scripting & output', slug: 'docs/guides/scripting' },
						{ label: 'Agent skill', slug: 'docs/guides/agent-skill' },
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
						{ label: 'Releases', link: '/docs/releases/' },
						{ label: 'Upgrading from 1.0', slug: 'docs/upgrading-from-1' },
						{ label: 'Security policy', slug: 'docs/project/security' },
						{ label: 'GitHub', link: GITHUB, attrs: { target: '_blank' } },
						{ label: 'GitHub releases', link: `${GITHUB}/releases`, attrs: { target: '_blank' } },
						{ label: 'Changelog', link: `${GITHUB}/blob/main/CHANGELOG.md`, attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
