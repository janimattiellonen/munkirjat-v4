import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'react-swipe';

export default class CoversView extends Component {
	next() {
		console.log("next");
    	this.refs.ReactSwipe.swipe.next();
  	}

	prev() {
		console.log("prev");
		this.refs.ReactSwipe.swipe.prev();
	}

	selectedItem(index, elem) {
		
	}

	render() {
		const {covers} = this.props;
		return (
			<div className="component swipe-container">
				<h1>Covers</h1>

				<p>Select cover image for book.</p>

				<ReactSwipe ref="ReactSwipe"
	                continuous={true}
	                callback={this.selectedItem}
	                key={covers.count()}
	            >
 	            	{covers.map((cover, i) => {
	            		return (
	            			<div key={i}><img src={cover}/></div>
	            		)
	            	})}
            	</ReactSwipe>

            	<div>
            		<button onClick={::this.prev}>Prev</button>
            		<button onClick={::this.next}>Next</button>
            	</div>

			</div>
		)
	}

}
