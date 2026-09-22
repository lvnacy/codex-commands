import { SubmissionModal } from '../../ENVOY/lib/modals/SubmissionModal.js';
import { Submission } from '../../ENVOY/lib/objects/Submission.js';

export function buildInvokeCommand(app) {
	return {
		name: 'Create ENVOY Submission',
		id: 'envoy-create-submission',
		callback() {
			new SubmissionModal(app, async (result) => {
				const folder = await Submission.resolveFolder(app);
				const submission = new Submission(app, { ...result, folder });
				const file = await submission.create();
				await app.workspace.getLeaf(false).openFile(file);
			}).open();
		}
	};
};