import { PublisherModal } from '../../ENVOY/lib/modals/PublisherModal.js';
import { Publisher } from '../../ENVOY/lib/objects/Publisher.js';

export function buildInvokeCommand(app) {
	return {
		name: 'Create ENVOY Publisher',
		id: 'envoy-create-publisher',
		callback() {
			new PublisherModal(app, async (result) => {
				const folder = await Publisher.resolveFolder(app);
				const publisher = new Publisher(app, { ...result, folder });
				const file = await publisher.create();
				await app.workspace.getLeaf(false).openFile(file);
			}).open();
		}
	};
};