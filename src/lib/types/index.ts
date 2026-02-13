import { z } from 'zod';

export const ArticleSchema = z.object({
	title: z.string(),
	slug: z.string(),
	date: z.string(),
	updated: z.string().optional(),
	description: z.string(),
	tags: z.array(z.string()),
	author: z.string().default('Edwin Zhao'),
	featured: z.boolean().default(false),
	draft: z.boolean().default(false),
	readingTime: z.number().optional()
});

export type Article = z.infer<typeof ArticleSchema>;

export const VideoSchema = z.object({
	title: z.string(),
	slug: z.string(),
	date: z.string(),
	description: z.string(),
	embedUrl: z.string().url(),
	duration: z.string(),
	tags: z.array(z.string()),
	featured: z.boolean().default(false),
	draft: z.boolean().default(false),
	timestamps: z
		.array(
			z.object({
				time: z.string(),
				label: z.string()
			})
		)
		.optional()
});

export type Video = z.infer<typeof VideoSchema>;

export const ToolSchema = z.object({
	name: z.string(),
	url: z.string().url(),
	category: z.string(),
	group: z.enum(['Our Tools', 'AI Assistants', 'Development']),
	cost: z.enum(['free', 'freemium', 'paid']),
	privacy: z.enum(['high', 'moderate', 'low']),
	ferpaCompliant: z.boolean().default(false),
	coppaCompliant: z.boolean().default(false),
	description: z.string(),
	educatorNotes: z.string().optional()
});

export type Tool = z.infer<typeof ToolSchema>;
