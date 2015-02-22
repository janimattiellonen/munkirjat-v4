var React 				= require('react');
var StatsBox 			= require('./StatsBox');
var Translate   		= require('react-translate-component');
var DateValue			= require('./DateValue');
var Router 				= require('react-router');

var Link = Router.Link;

var PrimaryStats = React.createClass({
	mixins: [Router.State],

	render: function() {

		var hrefCallback = function(item) {
			return (
				<a href={"#/book/" + item.id}>
					{item.title}<br/><DateValue date={item.created_at} />
				</a>
			)
		};

		var authorACallback = function(item) {
			return (
				<a href={"#/author/" + item.id}>
					{item.firstname} {item.lastname} ({item.amount}) 
				</a>
			)
		};

		return (
			<div className="stats-main">
				<p>Hello</p>
				<a href="/#/author/12/edit">Bar</a>
				
				<StatsBox class="h_taller" title="currentlyReading" url="/stats/currently-reading" />
				<StatsBox class="h_taller" title="latestReadBook" url="/stats/latest-read" />

				<StatsBox class="h_tallest" title="latestAddedBooks" url="/stats/latest-added" hrefCallback={hrefCallback} />
				<StatsBox class="h_tallest" title="favouriteAuthors" url="/stats/favourite-authors" hrefCallback={authorACallback} />

				<StatsBox class="h_tallest" title="recentlyRead" url="/stats/recently-read" />
				<StatsBox class="h_tallest" title="unread" url="/stats/unread" />

			</div>
		);
	}

});

module.exports = PrimaryStats;