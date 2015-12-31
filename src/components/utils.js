import moment from 'moment';
import numeral from 'numeral';
import SmartSearch from 'smart-search';
import {List} from 'immutable';

export function date_format(date, format = "D.M.YYYY") {
	return date != null && date != undefined ? moment(date).format(format) : '';
}

export function language(languageCode) {
	var language = '';

	switch(languageCode) {
		case 'fi':
		{
			language = 'Finnish';
			break;
		}
		case 'se':
		{
			language = 'Swedish';
			break;
		}
		case 'en':
		{
			language = 'English';
			break;
		}
		default:
		{
			language = '';
			break;
		}
	}

	return language;
}

export function yes_no(value) {
	return value ? 'Yes' : 'No';
}

export function money(value) {
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

	return numeral(value).format('0.00 $');
}

export function isPositiveInteger(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}

export function mysql_date(date) {
	if (null === date || undefined === date || "" == date) {
		return null;
	}
	
	return moment(date, "DD.MM.YYYY").format('YYYY-MM-DD 00:00:00');
}

export function filter(items, searchTerm, fields) {
	let patterns = [searchTerm];
	let results = SmartSearch(items, patterns, fields, {maxInsertions: 2});

	return List(results).map(a => a.entry);
}

export function isLoggedIn() {
	return localStorage.getItem("userToken") != null;
}
