import { ProjectModal } from '../../ENVOY/lib/modals/ProjectModal.js';
import { Project } from '../../ENVOY/lib/objects/Project.js';

export function buildInvokeCommand(app) {
	return {
		name: 'Create ENVOY Project',
		id: 'envoy-create-project',
		callback() {
			new ProjectModal(app, async (result) => {
				const folder = await Project.resolveFolder(app);
				const project = new Project(app, { ...result, folder });
				const file = await project.create();
				await app.workspace.getLeaf(false).openFile(file);
			}).open();
		}
	};
};