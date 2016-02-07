import React, {Component} from 'react';
import {Link} from 'react-router';

export default class GenresView extends Component {
	render() {
		const {genres} = this.props;

		return (
			<div className="component">
				<h1>Genres</h1>

				<ul>
					{genres.map(genre => {
						return (
							<li>{this.getUrl(genre)}</li>
						)
					})}

				</ul>
			</div>
		)
	}

	getUrl(genre) {
		return (
			<Link to={'/books/all/all/' + genre.id}>{genre.name} ({genre.amount})</Link>
		)
	}	
}
