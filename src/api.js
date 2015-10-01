import config from './config';
import axios from 'axios';
import { List } from 'immutable';

export default {

	saveAuthor(author) {
		axios.post('/author', author).then(function(res) {
			
		});
	},

	getAuthor(id) {
		return axios.get('/author/' + id).then(res => res.data);
	},

	getAuthors() {
		return axios.get('/authors').then(res => List(res.data));
	},

	getBook(id) {
		return axios.get('/book/' + id).then(res => res.data);
	},

	getBooks: (mode = null) => {
		return axios.get('/books/' + mode).then(res => List(res.data));
	}
};
