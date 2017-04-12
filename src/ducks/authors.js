import { List, Map} from 'immutable';
import _ from 'lodash';
import * as Errors from './Errors';
import Noty from '../components/Noty';

const defaultState = Map({
	authors: List(),
	author: {},
	books: List(),
	book: {}
});

function sortAuthors(authors) {
	return _.orderBy(authors.toArray(), ['lastname', 'firstname'], ['asc']);
}

function sortAuthorsByBookCount(authors) {
	return _.orderBy(authors.toArray(), ['amount'], ['desc']);
}

export function deleteAuthor(id) {
	return {
		type: 'AUTHOR_DELETE',
		id: id
	}
}

export function sortByBookCount() {
	return {
		type: 'AUTHORS_SORT_BY_BOOK_COUNT'
	}
}

export function sortByAuthorName() {
	return {
		type: 'AUTHORS_SORT_BY_NAME'
	}
}

export function removeAuthor(id) {
	return function(dispatch, getState) {
		api.removeAuthor(id).then(result => {
			dispatch(deleteAuthor(id));
			Noty.info('Author removed');
		}).catch(Errors.handleError);
	};
}

export function setAuthor(author) {

	author.books = List(author.books);

	return {
		type: 'AUTHOR_FETCH',
		author: author
	}
}

export function addAuthor(author) {
	return {
		type: 'AUTHOR_ADD',
		author: author,
	};
}

export function replaceAuthor(author) {
	return {
		type: 'AUTHOR_UPDATE',
		author: author,
	};
}

export function updateAuthor(author) {

	return function(dispatch, getState) {
		api.updateAuthor(author).then(author => {
			Noty.info('Author updated');
			dispatch(replaceAuthor(author));
			history.pushState(null, '/authors');
		}).catch(Errors.handleError);
	}
}

export function setAuthors(authors) {
	return {
		type: 'AUTHORS_FETCH',
		authors: authors,
	};
}

export function fetchAuthor(id) {
	return function(dispatch, getState) {
		api.getAuthor(id).then(author => {
			dispatch(setAuthor(author));
		}).catch(Errors.handleError);
	};
}

export function fetchAuthors() {
	return function(dispatch, getState) {
		api.getAuthors().then(authors => {
			dispatch(setAuthors(authors));
		}).catch(Errors.handleError);
	};
}

export function resetAuthor() {
	return {
		type: 'AUTHOR_RESET',
		author: null,
	};
}

export function createAuthor(author) {
	return function(dispatch, getState) {
		api.saveAuthor(author).then(author => {
			Noty.info('Author Created');
			dispatch(addAuthor(author));
			history.pushState(null, '/authors');
		}).catch(Errors.handleError);
	};
}

export function searchAuthors(input) {
	return function(dispatch, getState) {
		api.searchAuthors(input).then(authors => {
		}).catch(Errors.handleError);
	}
}


export default function (state = defaultState, action) {
	const { type, payload } = action;

	switch (type) {
		case 'AUTHORS_SORT_BY_BOOK_COUNT':
			return {
				...state,
				authors: List(sortAuthorsByBookCount(state.authors))
			}

		case 'AUTHORS_SORT_BY_NAME':
			return {
				...state,
				authors: List(sortAuthors(state.authors))
			}

		case 'AUTHOR_DELETE':
			let list = List(state.authors);
			let i = list.findIndex(item => item.id === action.id);

			return {
				...state,
				authors: list.remove(i)
			}

		case 'AUTHOR_ADD':
			let authors = List(state.authors.push(action.author));

			return {
				...state,
				authors: List(sortAuthors(authors))
			}

		case 'AUTHOR_UPDATE':
			let list = List(state.authors);
			let i = list.findIndex(item => item.id === action.author.id);

			list = list.set(i, action.author);

			return {
				...state,
				authors: List(sortAuthors(list))
			}

		case 'AUTHOR_RESET':
			return {
				...state,
				author: {}
			};

		case 'AUTHOR_FETCH':
			return {
				...state,
				author: action.author
			};

		case 'AUTHORS_FETCH':
			return {
				...state,
				authors: action.authors
			};

		case 'SET_BOOK_INFO':
			return {
				...state,
				book: action.book,
				showBookInfo: action.book != undefined && action.book.id != undefined
			};

		default:
			return state;
	}
}
