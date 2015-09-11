import config from './config';
import axios from 'axios';
import { List } from 'immutable';

export default {
    getBooks: (term) => {
    	return axios.get('/books?term=' + term).then(res => List(res.data));
    }
};
