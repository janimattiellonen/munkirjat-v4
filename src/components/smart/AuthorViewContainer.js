import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import * as AuthorActions from '../../actions/AuthorActions';
import AuthorView from '../dumb/AuthorView';

export default connect(
    function(state) {
        return {
            
        };
    },
    AuthorActions
)(AuthorView);
