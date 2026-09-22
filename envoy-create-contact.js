import { ContactModal } from '../../ENVOY/lib/modals/ContactModal.js';
import { Contact } from '../../ENVOY/lib/objects/Contact.js';

export function buildInvokeCommand(app) {
	return {
		name: 'Create ENVOY Contact',
		id: 'envoy-create-contact',
		callback() {
			new ContactModal(app, async (result) => {
				const folder = await Contact.resolveFolder(app);
				const contact = new Contact(app, { ...result, folder });
				const file = await contact.create();
				await app.workspace.getLeaf(false).openFile(file);
			}).open();
		}
	};
};