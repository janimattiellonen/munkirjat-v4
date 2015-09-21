import MunkirjatApp from '../dumb/MunkirjatApp';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
    function(state) {
        return {
            books: state.books.books,
            mode: state.books.mode
        }
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch), 
        	bookActions: bindActionCreators(BookActions, dispatch) 
        };
    }
)(MunkirjatApp);
