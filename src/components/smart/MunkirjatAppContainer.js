import MunkirjatApp from '../dumb/MunkirjatApp';
import { fetchAuthors } from '../../ducks/authors';
import * as BookActions from '../../actions/BookActions';
import * as GenreActions from '../../actions/GenreActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
  state => ({
    books: state.books.books,
    authors: state.authors.authors,
    genres: state.genres.genres,
    mode: state.books.mode
  }),
  dispatch => bindActionCreators({
    fetchAuthors
  }, dispatch)

)(MunkirjatApp);
