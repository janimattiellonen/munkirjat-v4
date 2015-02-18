var React 		= require('react');
var Immutable 	= require('immutable');
var ReadingTime 	= require('./ReadingTime');
var Translate   = require('react-translate-component');
var _			= require('underscore');
	
var StatsBox = React.createClass({
	getInitialState: function() {
		return {
			'items':  Immutable.List([])
		};
	},

	componentDidMount: function() {
		var self = this;
		console.log("url: " + this.props.url);
		$.get(this.props.url).done(function(data) {
			console.log("data: " + JSON.stringify(data));
			self.setState({
				'items': Immutable.List(data)
			});
		});
	},

	render: function() {
		var self = this;
		return (
			<div className="box h_taller">
				<h2><Translate content={this.props.title} /></h2>

				<ul>
					{ this.state.items.map(function(item) {
						console.log("sssss");
						return self.renderLi(item);
					}).toArray()}
				</ul>
			</div>
		);
	},

	renderLi: function(item) {
		console.log("dsfgdfg: " + JSON.stringify(item));
		return (
			<li>
				<a href="#/book/{item.id}">
					{item.title}<br/><ReadingTime item={item} showDuration="true" />
				</a>
			</li>
		)
	}
});

module.exports = StatsBox;