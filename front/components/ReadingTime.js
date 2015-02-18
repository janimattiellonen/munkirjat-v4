var React 		= require('react');
var Translate   = require('react-translate-component');
var _			= require('underscore');

var ReadingTime = React.createClass({
	render: function() {

		if (_.isUndefined(this.props.item.started_reading)) {
			return (<span></span>)
		}

		var str = moment(this.props.item.started_reading).format("D.M.YYYY");

		if (!_.isUndefined(this.props.item.finished_reading) && !_.isNull(this.props.item.finished_reading)) {
			str += " - " + moment(this.props.item.endDate).format("D.M.YYYY")
		}

		if (this.props.showDuration == "true") {
			str += " (" + this.duration(this.props.item.started_reading, this.props.item.finished_reading) + " days)"; 
		}

		return (<span>{str}</span>)
	},

	duration: function(startDate, endDate) {
		var startedReading = moment(startDate);
        var now = _.isUndefined(endDate) ? moment() : moment(endDate);

        return now.diff(startedReading, 'days') + 1;
	}	
});

module.exports = ReadingTime;