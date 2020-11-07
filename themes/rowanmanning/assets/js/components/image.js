
import Component from './component';

export default class Image extends Component {

	init() {
		console.log('LINK', 'link');
		if (typeof window.HTMLDialogElement === 'function') {
			this.handleRoleEvent('link', 'click', this.handleLinkClick.bind(this));
			this.handleRoleEvent('close', 'click', this.handleCloseClick.bind(this));
			this.handleRoleEvent('dialog', 'click', this.handleDialogClick.bind(this));
		}
	}

	get dialog() {
		if (!this._dialog) {
			this._dialog = this.initDialog();
		}
		return this._dialog;
	}

	initDialog() {
		const dialog = document.createElement('dialog');
		dialog.classList.add('image__dialog');
		dialog.setAttribute('data-role', `${this.constructor.id}:dialog`);
		dialog.innerHTML = `
			<img class="image__dialog-image" src="${this.role('link').getAttribute('href')}" />
			<button class="image__dialog-close" data-role="${this.constructor.id}:close">Close</button>
		`;
		this.element.appendChild(dialog);
		return dialog;
	}

	handleLinkClick(event) {
		this.dialog.showModal();
		event.preventDefault();
	}

	handleCloseClick() {
		this.dialog.close();
	}

	handleDialogClick(event) {
		if (event.target === this.dialog) {
			this.dialog.close();
		}
	}

}
