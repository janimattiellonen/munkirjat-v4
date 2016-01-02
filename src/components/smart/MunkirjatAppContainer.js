import MunkirjatApp from '../dumb/MunkirjatApp';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';
import * as GenreActions from '../../actions/GenreActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
    function mapStateToProps(state) {
        return {
            books: state.books.books,
            authors: state.authors.authors,
            genres: state.genres.genres,
            mode: state.books.mode
        }
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch), 
        	bookActions: bindActionCreators(BookActions, dispatch),
            genreActions: bindActionCreators(GenreActions, dispatch) 
        };
    }
)(MunkirjatApp);
