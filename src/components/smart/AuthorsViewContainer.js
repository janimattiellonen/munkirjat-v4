import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import * as AuthorActions from '../../actions/AuthorActions';
import AuthorsView from '../dumb/AuthorsView';

export default connect(
    function(state) {
        return {
            authors: state.authors.authors
        };
    },
    AuthorActions
)(AuthorsView);
