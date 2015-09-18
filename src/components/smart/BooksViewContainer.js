import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import * as BookActions from '../../actions/BookActions';
import BooksView from '../dumb/BooksView';

export default connect(
    function(state) {
        return {
            books: state.books.books,
            mode: state.books.mode
        };
    },
    BookActions
)(BooksView);
