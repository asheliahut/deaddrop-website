// Helpers shared by the releases page and the RSS feed.
import type { CollectionEntry } from 'astro:content';

type Release = CollectionEntry<'releases'>;

/** Anchor for a release on /docs/releases/, e.g. `v2-1-0`. */
export const releaseSlug = (version: string) => `v${version.replace(/[^0-9a-z]+/gi, '-')}`;

/** Newest first: by date, then by version for same-day releases. */
export const sortedReleases = (releases: Release[]) =>
	[...releases].sort(
		(a, b) =>
			b.data.date.getTime() - a.data.date.getTime() ||
			b.data.version.localeCompare(a.data.version, 'en', { numeric: true }),
	);
