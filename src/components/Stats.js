import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

export default class Stats {

	static getCurrentlyReadBook(books) {
		let filtered = books.filter(b => b.is_read == 0 && b.started_reading !== null && b.finished_reading === null);

		return filtered.count() === 1 ? filtered.first() : null;
	}

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
		let readBooks = this.getReadBooks(books).filter(book => null != book.started_reading && null != book.finished_reading);

		readBooks.map(book => {
			let startDate = moment(book.started_reading);
			let endDate = moment(book.finished_reading);
			readTime += endDate.diff(startDate)/ 1000 / 86400;
		});

		return readTime > 0 ? readTime / readBooks.count() : 0;
	}

	static getTimeTakenToReadAllUnreadBooks(books) {
		return this.getAverageReadTime(books) * this.getUnreadBookCount(books) / 365;
	}

	static getAverageBookPrice(books) {
		let booksWithPrice = this.getBooksWithValidPrice(books);

		return this.getMoneySpentOnBooks(booksWithPrice) / booksWithPrice.count();
	}

	static getBooksWithValidPrice(books) {
		return books.filter(book => book.price > 0);
	}

	static getMoneySpentOnBooks(books) {
		return _.sum(this.getBooksWithValidPrice(books).toArray(), function(book) {
			return book.price;
		});
	}

	static getPagesReadSoFar(books) {
		return _.sum(this.getReadBooks(books).toArray(), function(book) {
			return book.page_count;
		});
	}
}



