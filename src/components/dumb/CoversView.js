import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'react-swipe';
import BooksView from './BooksView';
import {Button} from 'react-bootstrap';
import {List} from 'immutable';

export default class CoversView extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	covers: List(),
        	currentIndex: 1,
        	coverUrl: null,
            book: null
        };
    }

	next() {
		console.log("NEXT");
		const covers = this.state.covers;
		let index = 1;

		if (this.state.currentIndex < covers.count()) {
			index = this.state.currentIndex + 1;
		}



		if (covers.count() > 1) {
			this.refs.ReactSwipe.swipe.next();
		} else if (covers.count() == 1) {
			this.refs.ReactSwipe.swipe.next();
			this.refs.ReactSwipe.swipe.slide(0, 0);
		}

		this.setState({
			currentIndex: this.refs.ReactSwipe.swipe.getPos() + 1,
		});
  	}

	prev() {
		const covers = this.state.covers;
		let index = covers.count();

		if (this.state.currentIndex > 1) {
			index = this.state.currentIndex - 1;
		}

		this.setState({
			currentIndex: index,
		});

		this.refs.ReactSwipe.swipe.prev();
	}

	selectedItem(index, element) {
		console.log("selected index: " + index + ": " + element.dataset.href);

		this.setState({
			coverUrl: element.dataset.href
		});
	}

	selectBook(book) {
		this.setState({
			book: book
		});
	}

	linkBookAndCover() {
		let index = this.refs.ReactSwipe.swipe.getPos();

		const cover = this.state.covers.get(index);

		this.props.coverActions.linkBookAndCover(this.state.book, cover);
		let covers = this.state.covers.remove(index);

		console.log("PPOS: " + this.refs.ReactSwipe.swipe.getPos());
		this.setState({
			covers: this.state.covers.remove(index),
			currentIndex: this.refs.ReactSwipe.swipe.getPos()
		});
	}

	getLinkTitle() {
		let title = 'Link';

		if (null !== this.state.book) {
			title += ' "' + this.state.book.title +'" with selected cover image';
		}

		return title;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.covers.count() > 0 && nextProps.covers.count() != this.props.covers.count()) {
			console.log("RECEIVING covers: " + nextProps.covers.count());
			this.setState({
				covers: nextProps.covers
			});

			this.refs.ReactSwipe.swipe.slide(0, 0);
		}
	}

	render() {
		let books =  this.props.books;
		const covers = this.state.covers;

		books = books.filter(book => book.cover_url == null);

		return (
			<div className="component swipe-container">
				<h1>Covers</h1>

				{covers.count() > 0 ?
					<div>
						<p>Select cover image for book.</p>
						
						<p>{this.state.currentIndex} / {covers.count()}</p>

						<ReactSwipe ref="ReactSwipe"
			                continuous={true}
			                callback={::this.selectedItem}
			                key={covers.count()}
			            >
		 	            	{covers.map((cover, i) => {
			            		return (
			            			<div key={i} data-href={cover}><img src={cover}/></div>
			            		)
			            	})}
		            	</ReactSwipe>

		            	<div>
		            		<button className="btn btn-default" onClick={::this.prev}>Prev</button>
		            		<button className="btn btn-default" onClick={::this.next}>Next</button>
		            	</div>

    	            	<div>
            				<Button bsStyle="primary" bsSize="large" block disabled={!this.state.book} onClick={::this.linkBookAndCover}>{this.getLinkTitle()}</Button>
            			</div>
		            </div>

	            	:
	            	<div>
	            		<p>No images available.</p>
	            	</div>
	            }

            	<BooksView key={books.count()} {...this.props} books={books} bookSelectionCallback={::this.selectBook}  />

			</div>
		)
	}
}
