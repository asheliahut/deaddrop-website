// Splits deaddrop's CHANGELOG.md into one Markdown file per release in
// src/content/releases/, for the /docs/releases/ page and /releases.xml feed.
//
//   node scripts/sync-releases.mjs ../deaddrop/CHANGELOG.md
//
// Existing files are overwritten, so run it again after every release.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const src = process.argv[2];
if (!src) {
	console.error('usage: node scripts/sync-releases.mjs <path to CHANGELOG.md>');
	process.exit(2);
}

const text = readFileSync(src, 'utf8');
const outDir = join(import.meta.dirname, '..', 'src', 'content', 'releases');
mkdirSync(outDir, { recursive: true });

// Link reference definitions at the bottom: [2.1.0]: https://...
const refs = Object.fromEntries(
	[...text.matchAll(/^\[([^\]]+)\]:\s*(\S+)\s*$/gm)].map((m) => [m[1], m[2]]),
);

const heading = /^## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})\s*$/gm;
const found = [...text.matchAll(heading)];
if (found.length === 0) {
	console.error(`no "## [x.y.z] - YYYY-MM-DD" headings found in ${src}`);
	process.exit(1);
}

for (const [i, m] of found.entries()) {
	const [, version, date] = m;
	const start = m.index + m[0].length;
	const end = i + 1 < found.length ? found[i + 1].index : text.search(/^\[[^\]]+\]:\s*\S+\s*$/m);
	const body = text
		.slice(start, end === -1 ? undefined : end)
		.replace(/^\[[^\]]+\]:\s*\S+\s*$/gm, '')
		.trim();
	const front = [
		'---',
		`version: ${JSON.stringify(version)}`,
		`date: ${date}`,
		refs[version] ? `compare: ${JSON.stringify(refs[version])}` : null,
		'---',
	]
		.filter(Boolean)
		.join('\n');
	const file = join(outDir, `${version}.md`);
	writeFileSync(file, `${front}\n\n${body}\n`);
	console.log(`wrote ${file}`);
}
