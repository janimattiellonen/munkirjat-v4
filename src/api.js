import config from './config';
import axios from 'axios';
import { List } from 'immutable';

export default {
    getBooks: (mode = null) => {
    	return axios.get('/books/' + mode).then(res => List(res.data));
    }
};
