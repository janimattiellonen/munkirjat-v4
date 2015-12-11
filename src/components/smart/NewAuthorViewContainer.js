import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthorForm from '../dumb/AuthorForm';
import * as AuthorActions from '../../actions/AuthorActions';
import * as BookActions from '../../actions/BookActions';


function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return { 
      authorActions: bindActionCreators(AuthorActions, dispatch), 
      bookActions: bindActionCreators(BookActions, dispatch) 
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorForm);




/*


@connect(
  	() => ({}),
  	function mapDispatchToProps(dispatch) {
        return { 
        	authorActions: bindActionCreators(AuthorActions, dispatch), 
        	bookActions: bindActionCreators(BookActions, dispatch) 
        };
    }
)
export default class NewAuthorViewContainer extends Component {

	handleSubmit(data) {
    	this.props.authorActions.createAuthor(data);
        }

	render() {

        console.log("ppp: " + JSON.stringify(this.props.params));
		return (
          <div>
                {this.props.children}

                <AuthorForm params={this.props.params} handleSubmit={::this.handleSubmit}/>
          </div>
		)
	}
}       

// re-do using https://github.com/pekkis/web-development-with-js/tree/sensor-thingy
*/