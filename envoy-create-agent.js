import { AgentModal } from '../../ENVOY/lib/modals/AgentModal.js';
import { Agent } from '../../ENVOY/lib/objects/Agent.js';

export function buildInvokeCommand(app) {
	return {
		name: 'Create ENVOY Agent',
		id: 'envoy-create-agent',
		callback() {
			new AgentModal(app, async (result) => {
				const folder = await Agent.resolveFolder(app);
				const agent = new Agent(app, { ...result, folder });
				const file = await agent.create();
				await app.workspace.getLeaf(false).openFile(file);
			}).open();
		}
	};
};