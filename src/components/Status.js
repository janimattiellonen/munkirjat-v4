import React from 'react';

export default React.createClass({

    render(): any {

        let status = this.props.status;

        return (
            <div className="status">
                <div>{status.uuid}: {status.text}</div>
            </div>
        );
    }

});
