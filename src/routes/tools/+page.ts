import type { PageLoad } from './$types';
import { ToolSchema } from '$lib/types';
import yaml from 'js-yaml';
import { z } from 'zod';

const GROUP_ORDER = ['Our Tools', 'AI Assistants', 'Development'] as const;

export const load: PageLoad = async () => {
	const toolsRaw = await import('/src/content/tools/tools.yaml?raw');
	const parsed = z.array(ToolSchema).parse(yaml.load(toolsRaw.default));

	const grouped = GROUP_ORDER.map((group) => ({
		group,
		tools: parsed.filter((t) => t.group === group)
	})).filter((g) => g.tools.length > 0);

	return { grouped };
};
