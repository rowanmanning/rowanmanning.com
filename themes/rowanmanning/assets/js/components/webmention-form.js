
import {fathomGoalIds} from '@params';

export default class WebmentionForm {

	// Construct a single webmention form
	constructor(rootElement) {
		this.rootElement = rootElement;
		this.fathomGoalId = fathomGoalIds.webmentionSend;
		this.rootElement.addEventListener('submit', this.handleSubmit.bind(this));
	}

	// Handle the form submit
	handleSubmit() {
		if (window.fathom && this.fathomGoalId) {
			window.fathom.trackGoal(this.fathomGoalId, 0);
		}
	}

	// Construct a single webmention form
	static init(...args) {
		return new this(...args);
	}

}
