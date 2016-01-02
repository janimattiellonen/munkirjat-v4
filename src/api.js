import config from './config';
import axios from 'axios';
import { List } from 'immutable';

/*
axios.interceptors.request.use(function (config) {
    // Do something before request is sent 
    	return config;
 	}, function (error) {
 		console.log("ERROR: " + JSON.stringify(error));
    // Do something with request error 
    	return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
    // Do something with response data 

    console.log("response: " + JSON.stringify(response));
    return response;
  }, function (error) {
  	console.log("error: " + JSON.stringify(error));


    // Do something with response error 
    return Promise.reject(error);
  });

*/
function getAuthorizationHeaders() {
	return {
		headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('userToken')
		}
	};
};

var headers = getAuthorizationHeaders();

export default {
	removeAuthor(id) {
		return axios.delete('/api/author/' + id, headers).then(res => res.data);
	},

	saveAuthor(author) {
		return axios.post('/api/author', author, headers).then(res => res.data);
	},

	updateAuthor(author) {
		return axios.put('/api/author/' + author.id, author, headers).then(res => res.data);
	},

	getAuthor(id) {
		return axios.get('/api/author/' + id).then(res => res.data);
	},

	getAuthors() {
		return axios.get('/api/authors').then(res => List(res.data));
	},

	searchAuthors(term) {
		return axios.get('/api/authors/' + term).then(res => List(res.data));
	},

	getBook(id) {
		return axios.get('/api/book/' + id).then(res => res.data);
	},

	getBooks: (mode = null) => {
		return axios.get('/api/books/' + mode).then(res => List(res.data));
	},

	saveBook(book) {
		return axios.post('/api/book', book, headers).then(res => res.data);
	},

	updateBook(book) {
		return axios.put('/api/book/' + book.id, book, headers).then(res => res.data);
	},

	searchGenres(term) {
		return axios.get('/api/genres/' + term).then(res => List(res.data));
	},
};
