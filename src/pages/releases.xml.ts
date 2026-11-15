// RSS 2.0 feed of deaddrop releases, at /releases.xml.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { RELEASES } from '../site';
import { releaseSlug, sortedReleases } from '../releases';

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// CDATA can't contain "]]>", so split it across two sections.
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

export const GET: APIRoute = async ({ site }) => {
	const base = site ?? new URL('https://deaddrop.rip');
	const page = new URL('/docs/releases/', base).href;
	const self = new URL('/releases.xml', base).href;
	const releases = sortedReleases(await getCollection('releases'));

	const items = releases
		.map((r) => {
			const link = `${page}#${releaseSlug(r.data.version)}`;
			const download = `${RELEASES}/tag/v${r.data.version}`;
			const html = `${r.rendered?.html ?? ''}<p><a href="${esc(download)}">Download deaddrop ${esc(r.data.version)}</a></p>`;
			return `    <item>
      <title>deaddrop ${esc(r.data.version)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">deaddrop-v${esc(r.data.version)}</guid>
      <pubDate>${r.data.date.toUTCString()}</pubDate>
      <description>${cdata(html)}</description>
    </item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>deaddrop releases</title>
    <link>${esc(page)}</link>
    <atom:link href="${esc(self)}" rel="self" type="application/rss+xml" />
    <description>New releases of deaddrop and what changed in each.</description>
    <language>en</language>
${releases[0] ? `    <lastBuildDate>${releases[0].data.date.toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
