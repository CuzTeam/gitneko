import { cuzAIProviderDescriptor as provider } from '../constants.js';
import type { AIModel } from '../models/model.js';
import { OpenAICompatibleProviderBase } from './openAICompatibleProviderBase.js';

type CuzAIModel = AIModel<typeof provider.id>;
const models: CuzAIModel[] = [
	{
		id: 'grok-build',
		name: 'Grok Build',
		maxTokens: { input: 131072, output: 4096 },
		provider: provider,
		default: true,
	},
	{
		id: 'gpt-oss-120b',
		name: 'GPT-OSS 120B',
		maxTokens: { input: 131072, output: 4096 },
		provider: provider,
	},
	{
		id: 'gpt-oss-20b',
		name: 'GPT-OSS 20B',
		maxTokens: { input: 131072, output: 4096 },
		provider: provider,
	},
];

export class CuzAIProvider extends OpenAICompatibleProviderBase<typeof provider.id> {
	readonly id = provider.id;
	readonly name = provider.name;
	protected readonly descriptor = provider;
	protected readonly config = {
		keyUrl: undefined,
		keyValidator: /(?:sk-)?[a-zA-Z0-9]{32,}/,
	};

	getModels(): Promise<readonly AIModel<typeof provider.id>[]> {
		return Promise.resolve(models);
	}

	protected getUrl(_model: AIModel<typeof provider.id>): string {
		return 'https://ai.cuz-lab.space/v1/chat/completions';
	}
}
