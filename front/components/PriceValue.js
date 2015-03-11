var React 				= require('react');
var Translate   		= require('react-translate-component');
var numeral				= require('numeral');

var PriceValue = React.createClass({

	render: function() {

		numeral.language('en', {
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        currency: {
	            symbol: '€'
	        }
	    });

		numeral.language('en');

		return (
			<span>{numeral(this.props.price).format('0.00 $')}</span>
		);
	}

});

module.exports = PriceValue;