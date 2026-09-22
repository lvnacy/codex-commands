import { EssayModal } from '../../codex/module.library/lib/modals/EssayModal.js';
import { Essay } from '../../codex/module.library/lib/objects/Essay.js';
import { Log } from '../../codex/utils/logger.js';

const REQUIRED_CITATION_FIELDS = ['authors', 'year'];

export function buildInvokeCommand(app) {
	return {
		name: 'Create Library Essay',
		id: 'library-create-essay',
		callback() {
			new EssayModal(app, async (result) => {
				try {
					const missing = REQUIRED_CITATION_FIELDS.filter(
						(key) => !result[key] || (Array.isArray(result[key]) && result[key].length === 0)
					);
					if (missing.length > 0) {
						const error = new Error(
							`Essay requires the following field(s) to build its citation: ${ missing.join(', ') }.`
						);
						Log.error(
							'library-create-essay',
							error.message,
							error
						);
						throw error;
					}

					const folder = await Essay.resolveFolder(app);
					const essay = new Essay(app, { ...result, folder });
					const file = await essay.create();
					await app.workspace.getLeaf(false).openFile(file);
				} catch (error) {
					Log.error(
						'library-create-essay',
						'Essay creation failed.',
						error
					);
					throw error;
				}
			}).open();
		}
	}
};