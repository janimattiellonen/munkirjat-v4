import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'react-swipe';
import BooksView from './BooksView';
import {Button} from 'react-bootstrap';

export default class CoversView extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	coverUrl: null,
            book: null
        };
    }

	next() {
		console.log("next");
    	this.refs.ReactSwipe.swipe.next();
  	}

	prev() {
		console.log("prev");
		this.refs.ReactSwipe.swipe.prev();
	}

	selectedItem(index, element) {
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
		this.props.coverActions.linkBookAndCover(this.state.book.id, this.state.coverUrl);
	}

	getLinkTitle() {
		let title = 'Link';

		if (null !== this.state.book) {
			title += ' "' + this.state.book.title +'" with selected cover image';
		}

		return title;
	}

	render() {
		const {books, covers} = this.props;
		return (
			<div className="component swipe-container">
				<h1>Covers</h1>

				<p>Select cover image for book.</p>

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

            	<BooksView books={books} bookSelectionCallback={::this.selectBook} {...this.props} />

			</div>
		)
	}

}
