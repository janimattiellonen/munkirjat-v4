import MunkirjatApp from '../dumb/MunkirjatApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as GenreActions from '../../actions/GenreActions';
import GenresView from '../dumb/GenresView';

export default connect(
    function(state) {
        return {
            genres: state.genres.genres
        };
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	genreActions: bindActionCreators(GenreActions, dispatch), 
        };
    }
)(GenresView);
