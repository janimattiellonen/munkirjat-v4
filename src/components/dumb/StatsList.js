import React, {Component, PropTypes} from 'react';

export default class StatsList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {items, render} = this.props;

		return (
			<ul>
				{items.map((item, i) => {
					return (
						<li key={item.id}>
							{render(item)}
						</li>
					)
				})}
			</ul>
		)
	}
}
