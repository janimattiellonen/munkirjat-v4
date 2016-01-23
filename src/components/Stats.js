import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

export default class Stats {

	static getCurrentlyReadBook(books) {
		let filtered = books.filter(b => b.is_read == 0 && b.started_reading !== null && b.finished_reading === null);
		return filtered.count() === 1 ? filtered.first() : null;
	}

	static getLatestReadBook(books) {
		let latestReadBook = this.getRecentlyReadBooks(books, 1);

		return latestReadBook.count() === 1 ? latestReadBook.first() : null;
	}

	static getLatestAddedBooks(books, amount = 10) {
		return books.sort((a, b) => {
			return a.id < b.id;
		}).take(amount);
	}

	static getRecentlyReadBooks(books, amount = 10) {
		let filtered = books.filter(b => b.is_read == 1 && b.started_reading !== null && b.finished_reading !== null);

		return filtered.sort((a, b) => {
			return moment(a.finished_reading).unix() < moment(b.finished_reading).unix();
		}).take(amount);
	}

	static getUnreadBooks(books, amount = 10) {
		let filtered = books.filter(b => b.is_read == 0 && (b.started_reading === null || b.finished_reading === null));

		let sorted = filtered.sort((a, b) => {
			return a.id < b.id;
		});

		return null !== amount ? sorted.take(amount) : sorted;
	}

	static getFavouriteAuthors(authors, amount = 10) {
		return authors.sort((a, b) => {
			return a.amount < b.amount;
		}).take(amount);
	}

	static getUnreadBookCount(books) {
		return this.getUnreadBooks(books, null).count()
	}

	static getReadBookCount(books) {
		return this.getReadBooks(books).count();
	}

	static getReadBooks(books) {
		return books.filter(n => n.is_read == 1);
	}

	static getSlowestReadTime(books) {
		let readTime = null;
		let slowestBook = null;

		this.getReadBooks(books).map(book => {
			if (null != book.started_reading && null != book.finished_reading) {
				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				
				if (null == readTime || endDate.diff(startDate) > readTime) {
					readTime = endDate.diff(startDate);
					slowestBook = book;
				}
			}
		});

		return {
			readTime: readTime / 1000 / 86400,
			book: slowestBook 
		}
	}

	static getFastestReadTime(books) {
		let readTime = null;
		let fastestBook = null;

		this.getReadBooks(books).map(book => {
			if (null != book.started_reading && null != book.finished_reading) {
				let startDate = moment(book.started_reading);
				let endDate = moment(book.finished_reading);
				
				if (null == readTime || endDate.diff(startDate) < readTime) {
					readTime = endDate.diff(startDate);
					fastestBook = book;
				}
			}
		});

		return {
			readTime: readTime / 1000 / 86400,
			book: fastestBook 
		}
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



