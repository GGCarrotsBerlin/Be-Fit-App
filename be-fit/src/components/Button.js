/**
 * Created by Doro on 16.10.16.
 */
import React from 'react';


var Button = React.createClass({

    render: function () {
        return (
            <button
                className="btn btn-success btn-lg"
                onClick={this.props.handleClick}>{this.props.label}</button>
        );
    }
});

module.exports = Button;