import moment from 'moment';
import numeral from 'numeral';

export default class Stats {

	static getUnreadBookCount(books) {
		return this.getUnreadBooks(books).count()
	}

	static getReadBookCount(books) {
		return this.getReadBooks(books).count();
	}

	static getReadBooks(books) {
		return books.filter(n => n.is_read == 1);
	}

	static getUnreadBooks(books) {
		return books.filter(n => n.is_read == 0);
	}

	static getSlowestReadTime(books) {
		let readTime = null;

		this.getReadBooks(books).map(book => {
			if (null != book.started_reading && null != book.finished_reading) {
				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				
				if (null == readTime || endDate.diff(startDate) > readTime) {
					readTime = endDate.diff(startDate);
				}
			}
		});

		return readTime / 1000 / 86400;
	}

	static getFastestReadTime(books) {
		let readTime = null;

		this.getReadBooks(books).map(book => {
			if (null != book.started_reading && null != book.finished_reading) {
				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				
				if (null == readTime || endDate.diff(startDate) < readTime) {
					readTime = endDate.diff(startDate);
				}
			}
		});

		return readTime / 1000 / 86400;
	}

	static getAverageReadTime(books) {
		let readTime = 0;
		let readBooks = this.getReadBooks(books);

		readBooks.map(book => {
			if (null != book.started_reading && null != book.finished_reading) {

				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				readTime += endDate.diff(startDate);
			}
		});

		return readTime > 0 ? readTime / 1000 / 86400 / readBooks.count() : 0;
	}

	static getTimeTakenToReadAllUnreadBooks(books) {

		return this.getAverageReadTime(books) * this.getUnreadBookCount(books);
	}
}



