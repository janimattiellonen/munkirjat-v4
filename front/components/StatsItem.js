var counterpart = require('counterpart');
var React 		= require('react');
var Translate   = require('react-translate-component');

var StatsItem = React.createClass({
	render: function() {
		return (
			<div>
				<h3><Translate content={this.props.stat.title} /></h3>

				<p dangerouslySetInnerHTML={this.getTitle(this.props.stat)} />
			</div>
		);
	},

    getSuffix: function(item) {
        var daysSuffix = [
            "slowestReadTime",
            "avgReadTime",
            "fastestReadTime"
        ];

        if(_.indexOf(daysSuffix, item.title) != -1) {
            return " days";
        }

        if (item.title == 'moneySpent') {
            return "&euro;";
        }

        return "";
    },

    getTitle: function(item) {
        var html = "";

        if (item.title == 'moneySpent') {
            html = item.value.value + this.getSuffix(item) + " (" + item.value.title + " books)";
        } else {
            html = item.value + this.getSuffix(item)
        }

        return {__html: html};
    }
});

module.exports = StatsItem;
