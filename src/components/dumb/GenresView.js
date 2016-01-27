import React, {Component} from 'react';

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
			<a href={'/#/books/all/all/' + genre.id}>{genre.name} ({genre.amount})</a>
		)
	}	
}
