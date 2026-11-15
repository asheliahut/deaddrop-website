import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	// One file per deaddrop release, generated from its CHANGELOG.md by
	// scripts/sync-releases.mjs. Feeds /docs/releases/ and /releases.xml.
	releases: defineCollection({
		loader: glob({ pattern: '*.md', base: './src/content/releases' }),
		schema: z.object({
			version: z.string(),
			date: z.coerce.date(),
			compare: z.url().optional(),
		}),
	}),
};
