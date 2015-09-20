import config from './config';
import axios from 'axios';
import { List } from 'immutable';

export default {

	getAuthor(id) {
		return axios.get('/author/' + id).then(res => List(res.data));
	},

	getAuthors() {
		return axios.get('/authors').then(res => List(res.data));
	},

	getBooks: (mode = null) => {
		return axios.get('/books/' + mode).then(res => List(res.data));
	}
};
