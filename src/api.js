import config from './config';
import axios from 'axios';
import { List } from 'immutable';

function getAuthorizationHeaders() {
	return {
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('userToken')
		}
	};
};

var headers = getAuthorizationHeaders();

export default {

	testProtected() {
		return axios.get('/protected', {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('userToken')
			}
		})
	},

	removeAuthor(id) {
		return axios.delete('/author/' + id, headers).then(res => res.data);
	},

	saveAuthor(author) {
		return axios.post('/author', author, headers).then(res => res.data);
	},

	updateAuthor(author) {
		return axios.put('/author/' + author.id, author, headers).then(res => res.data);
	},

	getAuthor(id) {
		return axios.get('/author/' + id).then(res => res.data);
	},

	getAuthors() {
		return axios.get('/authors').then(res => List(res.data));
	},

	searchAuthors(term) {
		return axios.get('/authors/' + term).then(res => List(res.data));
	},

	getBook(id) {
		return axios.get('/book/' + id).then(res => res.data);
	},

	getBooks: (mode = null) => {
		return axios.get('/books/' + mode).then(res => List(res.data));
	},

	saveBook(book) {
		return axios.post('/book', book, headers).then(res => res.data);
	},

	updateBook(book) {
		return axios.put('/book/' + book.id, book, headers).then(res => res.data);
	}

};
