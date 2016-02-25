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
        	currentIndex: 0,
        	coverUrl: null,
            book: null
        };
    }

	next() {
		console.log("NEXT");
		const covers = this.state.covers;
		let index = 0;

		if (this.state.currentIndex < covers.count() - 1) {
			index = this.state.currentIndex + 1;
		}

		if (covers.count() > 1) {
			this.refs.ReactSwipe.swipe.next();
		}

		this.setState({
			currentIndex: index,
		});

		console.log("next:index: " + index);
  	}

	prev() {
		const covers = this.state.covers;
		let index = covers.count() - 1;

		if (this.state.currentIndex > 0) {
			index = this.state.currentIndex - 1;
		}

		this.setState({
			currentIndex: index,
		});

		console.log("prev:index: " + index);

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
		let index = parseInt(this.refs.ReactSwipe.swipe.getPos());
		console.log("linkBookAndCover: " + index);
		const cover = this.state.covers.get(index);

		this.props.coverActions.linkBookAndCover(this.state.book, cover);
		let covers = this.state.covers.remove(index);

		if (index == covers.count()) {
			index = index - 1;
		}

		this.setState({
			covers: covers,
			currentIndex: index,
			book: null
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
		}
	}

	getStartSlide() {
		let index = this.state.currentIndex;

		console.log("getStartSlide: " + index);

		return index;
	}

	render() {
		let books =  this.props.books;
		const covers = this.state.covers;

		books = books.filter(book => book.cover_url == null);

		return (
			<div className="component swipe-container">
				{covers.count() > 0 ?
					<div className="cover-image-container">
						<h1>Covers</h1>
						<p>Select cover image for book.</p>
						
						<p>{this.state.currentIndex + 1} / {covers.count()}</p>

						<ReactSwipe ref="ReactSwipe"
			                continuous={true}
			                callback={::this.selectedItem}
			                key={covers.count()}
			                startSlide={this.getStartSlide()}
			            >
		 	            	{covers.map((cover, i) => {
			            		return (
			            			<div className="swipe-image-container" key={i} data-href={cover}><img src={cover}/></div>
			            		)
			            	})}
		            	</ReactSwipe>

		            	<div>
		            		<button className="btn btn-default" disabled={this.state.covers.count() <= 1} onClick={::this.prev}>Prev</button>
		            		<button className="btn btn-default" disabled={this.state.covers.count() <= 1} onClick={::this.next}>Next</button>
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
