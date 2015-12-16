import api from '../api';
import { List } from 'immutable';

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
			dispatch(replaceAuthor(author));
		});
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
		});
	};
}

export function fetchAuthors() {
	return function(dispatch, getState) {
		api.getAuthors().then(authors => {
			dispatch(setAuthors(authors));
		});
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
			dispatch(addAuthor(author));
		});
	};
}

export function searchAuthors(input) {
	return function(dispatch, getState) {
		api.searchAuthors(input).then(authors => {
			console.log(JSON.stringify(authors));
		});
	}
}