import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CoverActions from '../../actions/CoverActions';
import CoversView from '../dumb/CoversView';

export default connect(
    function(state) {
        return {
            covers: state.covers.covers
        };
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	coverActions: bindActionCreators(CoverActions, dispatch), 
        };
    }
)(CoversView);
