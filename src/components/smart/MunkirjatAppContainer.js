import MunkirjatApp from '../dumb/MunkirjatApp';
import * as BookActions from '../../actions/BookActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
    function(state) {
        return {
            books: state.books.books
        }
    },
    function mapDispatchToProps(dispatch) {
        return { bookActions: bindActionCreators(BookActions, dispatch) };
    }
)(MunkirjatApp);
