
import urlize from '../utils/urlize';

export default class Component {

	constructor(element) {
		this.element = element;
		this.init();
	}

	init() {
		throw new Error('Component `init` method must be extended');
	}

	select(selector) {
		return this.element.querySelector(selector);
	}

	selectAll(selector) {
		return [...this.element.querySelectorAll(selector)];
	}

	role(role) {
		return this.select(this.constructor.getRoleSelector(role));
	}

	handleRoleEvent(role, eventType, handler) {
		this.element.addEventListener(eventType, event => {
			for (const target of event.composedPath()) {
				if (target.matches(this.constructor.getRoleSelector(role))) {
					handler.call(target, event, target);
					break;
				}
				if (target === this.element) {
					break;
				}
			}
		}, false);
	}

	static get id() {
		return urlize(this.name);
	}

	static get selector() {
		return `[data-component="${this.id}"]`;
	}

	static getRoleSelector(role) {
		return `[data-role="${this.id}:${role}"]`;
	}

	static mount(element) {
		return new this(element);
	}

	static mountAll(rootElement) {
		const elements = [...rootElement.querySelectorAll(this.selector)];
		return elements.map(element => this.mount(element));
	}

}
