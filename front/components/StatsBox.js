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
		
		$.get(this.props.url).done(function(data) {
			self.setState({
				'items': Immutable.List(data)
			});
		});
	},

	render: function() {
		var self = this;
		return (
			<div className={"box " + this.props.class}>
				<h2><Translate content={this.props.title} /></h2>

				<ul>
					{ this.state.items.map(function(item) {
						return self.renderLi(item, self.props.hrefCallback);
					}).toArray()}
				</ul>
			</div>
		);
	},

	renderLi: function(item, hrefCallback) {
		var callback = hrefCallback ? hrefCallback : this.renderA;

		return (
			<li>
				{callback(item)}
			</li>
		);
	},

	renderA: function(item) {
		return (
			<a href={"#/book/" + item.id}>
				{item.title}<br/><ReadingTime item={item} showDuration="true" />
			</a>	
		)
	}
});

module.exports = StatsBox;