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

export function createAuthor(author) {
	return function(dispatch, getState) {

		api.saveAuthor(author).then(response => {
			author.id = Math.floor(Math.random() * (10000 - 1000)) + 1000;
			author.name = "Jane Doe";
			author.amount = Math.floor(Math.random() * (10000 - 1000)) + 1000;
			console.log("lussor: " + JSON.stringify(author));
			dispatch(addAuthor(author));
		});
	};

}