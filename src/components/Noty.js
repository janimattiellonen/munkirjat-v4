import noty from 'noty';

export default class Noty {

	static info(text) {
		this.message(text, 'information');
	}

	static error(text) {
		this.message(text, 'error');
	}

	static message(text, type) {
		noty({
			text: text,
			type: type,
			timeout: 1000,
			layout: 'center'
		});
	}
}