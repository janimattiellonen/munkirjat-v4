import React, {Component} from 'react';
import {Link} from 'react-router';
import ReactSwipe from 'react-swipe';

export default class CoversView extends Component {
	next() {
    	this.refs.ReactSwipe.swipe.next();
  	}

	prev() {
		this.refs.ReactSwipe.swipe.prev();
	}

	selectedItem(index, elem) {
		
	}

	render() {
		const {covers} = this.props;

		return (
			<div className="component">
				<h1>Covers</h1>

				<ReactSwipe ref="ReactSwipe"
	                continuous={true}
	                callback={this.selectedItem}
	            >
	            	{covers.map((cover, i) => {
	            		return (
	            			<div key={i}><img src={cover} /></div>
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
