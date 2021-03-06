import React, {Component} from 'react';
import {List} from 'immutable';
import moment from 'moment';
import numeral from 'numeral';
import Stats from '../Stats';
import {Link} from 'react-router';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import * as Utils from '../utils';
import BookInfoView from './BookInfoView';	
import classNames from 'classnames';

export default class StatisticsView extends Component {

	constructor(props) {
		super(props);

		this.state = {
			unreadBookCount: 0,
			readBookCount: 0,
			bookCount: 0,
			authorCount: 0,
			slowestReadTime: null,
			fastestReadTime: null,
			averageReadTime: null,
			timeToReadAllBooks: 0,
			averageBookPrice: 0,
			moneySpentOnBooks: 0,
			pagesRedSoFar: 0
		}
	}

	componentWillReceiveProps(nextProps) {
		const {authors, books} = nextProps;
		this.setState({
			unreadBookCount: this.getUnreadBookCount(books),
			readBookCount: this.getReadBookCount(books),
			bookCount: books.count(),
			authorCount: authors.count(),
			slowestReadTime: this.getSlowestReadTime(books),
			fastestReadTime: this.getFastestReadTime(books),
			averageReadTime: this.getAverageReadTime(books),
			timeToReadAllBooks: this.getTimeTakenToReadAllUnreadBooks(books),
			averageBookPrice: this.getAverageBookPrice(books),
			moneySpentOnBooks: this.getMoneySpentOnBooks(books),
			pagesReadSoFar: this.getPagesReadSoFar(books),
			mostPagesInBook: this.getMostPagesInBook(books),
			leastPagesInBook: this.getLeastPagesInBook(books),
			averagePageCount: this.getAveragePageCount(books),
		});
	}

	render() {
		return (
            <div className={classNames("stats")} >
				<h2>Statistics</h2>

				<h3>Unread books</h3>

				<p><Link to="/books/unread">{this.state.unreadBookCount}</Link></p>	

				<h3>Read books</h3>

				<p><Link to="/books/read">{this.state.readBookCount}</Link></p>	

				<h3>Books in bookshelf</h3>

				<p><Link to="/books">{this.state.bookCount}</Link></p>	

				<h3>Authors in bookshelf</h3>

				<p><Link to="/authors">{this.state.authorCount}</Link></p>	

				<h3>Slowest read time</h3>		

				<p>{this.state.slowestReadTime}</p>		

				<h3>Fastest read time</h3>		

				<p>{this.state.fastestReadTime}</p>	

				<h3>Average read time</h3>		

				<p>{this.state.averageReadTime}</p>					

				<h3>Estimated time to read all unread books</h3>

				<p>{this.state.timeToReadAllBooks}</p>

				<h3>Average book price</h3>

				<p>{this.state.averageBookPrice}</p>

				<h3>Money spent on books</h3>

				<p>{this.state.moneySpentOnBooks}</p>

				<h3>Pages read so far</h3>

				<p>{this.state.pagesReadSoFar}</p>

				<h3>Least pages in a book</h3>

				<p>{this.state.leastPagesInBook}</p>					

				<h3>Most pages in a book</h3>

				<p>{this.state.mostPagesInBook}</p>

				<h3>Average page count</h3>

				<p>{this.state.averagePageCount}</p>

			</div>	
		);
	}

	getAuthorCount(authors) {
		return authors.count();
	}

	getUnreadBookCount(books) {
		return Stats.getUnreadBookCount(books);
	}

	getReadBookCount(books) {
		return Stats.getReadBookCount(books);
	}

	getSlowestReadTime(books) {
		const {book, readTime} = Stats.getSlowestReadTime(books);

		return this.getBookLink(book, this.formatDays(readTime, true), this.getAdditionalInfoIcon());
	}

	getFastestReadTime(books) {
		const {book, readTime} = Stats.getFastestReadTime(books);

		return this.getBookLink(book, this.formatDays(readTime, true), this.getAdditionalInfoIcon());
	}

	getBookLink(book, title, icon = null) {
		if (null != book) {
			const tooltip = (
			  	<Tooltip id={"tooltip-book-" + book.id}>
			  		<BookInfoView book={book} singleMode={true}/>
			  	</Tooltip>
			);

			return (
			    <OverlayTrigger placement="left" overlay={tooltip}>
			      	<Link to={"/book/" + book.id}>{title} {icon}</Link>
			    </OverlayTrigger>
			)	
		} else {
			return 0;
		}
	}

	getAverageReadTime(books) {
		return this.formatDays(Stats.getAverageReadTime(books), true);
	}

	getTimeTakenToReadAllUnreadBooks(books) {
		return numeral(Stats.getTimeTakenToReadAllUnreadBooks(books)).format('0.00') + ' year(s)';
	}

	getAverageBookPrice(books) {
		let avg = Stats.getAverageBookPrice(books);

		return this.formatCurrency(avg);
	}

	getMoneySpentOnBooks(books) {
		let sum = Stats.getMoneySpentOnBooks(books);

		return this.formatCurrency(sum);
	}

	formatCurrency(value) {
		return value > 0 ? numeral(value).format('0.00').replace('.', ',') + '€' : '0€';
	}

	getPagesReadSoFar(books) {
		return Stats.getPagesReadSoFar(books);
	}

	getMostPagesInBook(books) {
		var book = Stats.getMostPagesInBook(books);

		return this.getBookLink(book, book.page_count, this.getAdditionalInfoIcon());
	}

	getLeastPagesInBook(books) {
		var book = Stats.getLeastPagesInBook(books);

		return this.getBookLink(book, book.page_count, this.getAdditionalInfoIcon());
	}

	getAveragePageCount(books) {
		return numeral(Stats.getAveragePageCount(books)).format('0.00');
	}

	formatDays(days, isDecimal = false) {
		if (isDecimal) {
			days = numeral(days).format('0.00');
		}

		return days > 1.0 ? days.replace(/\.[0]+$/, '') + ' days' : days.replace(/\.[0]+$/, '') + ' day';
	}		

	getAdditionalInfoIcon() {
		return (
			<span className="glyphicon glyphicon-stats" aria-hidden="true"></span>
		);
	}
};

StatisticsView.defaultProps = {
	stats: List(),
	books: List(),
	authors: List()
};
