import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';
import AuthorView from '../dumb/AuthorView';

export default connect(
    function(state) {
        return {
            author: state.authors.author,
            book: state.books.book
        };
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch), 
        	bookActions: bindActionCreators(BookActions, dispatch) 
        };
    }
)(AuthorView);
