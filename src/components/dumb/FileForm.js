import React, {Component, PropTypes} from 'react';

export default class FileForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data_uri: null,
            file: null
        };
    }

    // prevent form from submitting; we are going to capture the file contents
    handleSubmit(e) {
        e.preventDefault();
        console.log("FileForm::handleSubmit");

        var reader = new FileReader();
        var self = this;
        reader.onloadend = function () {
            self.props.handleSubmit(self.state.file, reader.result);
        }

        reader.readAsDataURL(this.state.file);
    }

  // when a file is passed to the input field, retrieve the contents as a
  // base64-encoded data URI and save it to the component's state
  handleFile(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
        self.setState({
            data_uri: upload.target.result,
            file: file
        });
    }

    reader.readAsDataURL(file);
  }

  // return the structure to display and bind the onChange, onSubmit handlers
  render() {
    // since JSX is case sensitive, be sure to use 'encType'
    return (
      <form onSubmit={::this.handleSubmit.bind(this)} encType="multipart/form-data">
        <input type="file" onChange={::this.handleFile} />

        <img src={this.state.data_uri} />
        <input type="submit"/>
      </form>
    );
  }
};