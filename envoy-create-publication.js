import { PublicationModal } from '../../ENVOY/lib/modals/PublicationModal.js';
import { Publication } from '../../ENVOY/lib/objects/Publication.js';

export function buildInvokeCommand(app) {
	return {
		name: 'Create ENVOY Publication',
		id: 'envoy-create-publication',
		callback() {
			new PublicationModal(app, async (result) => {
				const folder = await Publication.resolveFolder(app);
				const publication = new Publication(app, { ...result, folder });
				const file = await publication.create();
				await app.workspace.getLeaf(false).openFile(file);
			}).open();
		}
	};
};