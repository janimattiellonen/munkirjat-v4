import moment from 'moment';

export function date_format(date, format = "D.M.YYYY") {
	return date != null && date != undefined ? moment(date).format(format) : '';
}

export function language(languageCode) {
	console.log("LANG: " + languageCode);
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