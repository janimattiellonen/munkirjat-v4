import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthorActions from '../../actions/AuthorActions';
import AuthorsView from '../dumb/AuthorsView';

export default connect(
    function(state) {
        return {
            authors: state.authors.authors
        };
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch)
        };
    }
)(AuthorsView);
