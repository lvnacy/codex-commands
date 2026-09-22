const { ImageModal } = await requireAsync('../../codex/lib/modals/ImageModal.js');
const { Image } = await requireAsync('../../codex/lib/objects/Image.js');
const { Log } = await requireAsync('../../codex/utils/logger.js');

export async function buildInvokeCommand(app) {
	return {
		name: 'Create Image',
		id: 'apparatus-create-image',
		callback() {
			new ImageModal(app, async (result) => {
				try {
					if (!result.imageVaultPath && !result.source) {
						const error = new Error('Image requires either a vault path or a source to be meaningful.');
						Log.error(
							'apparatus-create-image',
							error.message,
							error
						);
						throw error;
					}

					const folder = await Image.resolveFolder(app);
					const image = new Image(app, { ...result, folder });
					const file = await image.create();
					await app.workspace.getLeaf(false).openFile(file);
				} catch (error) {
					Log.error(
						'apparatus-create-image',
						'Image creation failed.',
						error
					);
					throw error;
				}
			}).open();
		}
	};
};