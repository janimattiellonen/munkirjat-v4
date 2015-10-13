import moment from 'moment';
import numeral from 'numeral';

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