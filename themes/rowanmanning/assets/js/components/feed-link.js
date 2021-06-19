
import {fathomGoalIds} from '@params';

export default class FeedLink {

	// Construct a single feed link
	constructor(rootElement) {
		this.rootElement = rootElement;
		this.fathomGoalId = fathomGoalIds.feedView;
		this.rootElement.addEventListener('click', this.handleClick.bind(this));
	}

	// Handle the link click
	handleClick() {
		if (window.fathom && this.fathomGoalId) {
			window.fathom.trackGoal(this.fathomGoalId, 0);
		}
	}

	// Construct a single feed link
	static init(...args) {
		return new this(...args);
	}

}
