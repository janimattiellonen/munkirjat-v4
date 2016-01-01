import api from '../api';
import { List } from 'immutable';
import Noty from '../components/Noty';
import { Router, Route, Redirect, IndexRoute } from 'react-router';
import history from '../components/history';
import * as Errors from './Errors';

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
			dispatch(replaceAuthor(author));
			Noty.info('Author updated');
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
			dispatch(addAuthor(author));
			history.replaceState(null, '/authors');
			Noty.info('Author Created');
		}).catch(Errors.handleError);
	};
}

export function searchAuthors(input) {
	return function(dispatch, getState) {
		api.searchAuthors(input).then(authors => {
		}).catch(Errors.handleError);
	}
}