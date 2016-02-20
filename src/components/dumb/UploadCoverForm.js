import React, {Component, PropTypes} from 'react';
import FileForm from './FileForm';

export default class UploadCoverForm extends Component {

	render() {
		const {handleFileSubmit} = this.props;

		return (
			<div className="component">
				<h1>Upload new book cover</h1>
				<FileForm handleSubmit={handleFileSubmit}/>
			</div>
		)
	}
}