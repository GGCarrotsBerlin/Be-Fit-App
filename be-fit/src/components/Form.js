/**
 * Created by Doro on 16.10.16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Activities from './Activities';
import OutdoorIndoor from './OutdoorIndoor';
import Food from './Food';
import Health from './Health';
import Button from './Button';

var Form = React.createClass({

    getInitialState: function() {
        return {
            type: 'info',
            message: ''
        };
    },

    handleSubmit: function (event) {
        event.preventDefault();
        document.getElementById('map').scrollIntoView({behavior: "smooth"});
        this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);

        console.log('send form');
    },

    handleSelect: function(value) {
        console.log('select value from the dropdown:', value);
    }

    sendFormData: function () {
        // Fetch form values.
        var formData = {

        };

        console.log(formData);

        //make an ajax request here to call the api
        //use componentDidUpdate function to make sure the updated api changes are reflected, either here or in the parent component.
        //that's the ideal workflow
    },
    render: function () {
        return (
            <form method="post" onSubmit={this.handleSubmit} className="highlight">
                <h2>Search for a place fits you best in your city</h2>
                <div className="form-group">
                    <div className="col-sm-6">
                        <Activities ref="activity" label="What is your favorite sports?" onSelect={this.handleSelect}/>
                    </div>
                    <div className="col-sm-6">
                        <OutdoorIndoor ref="outdoor_indoor" label="How crazy are you about outdoor?"/>
                    </div>
                </div>
                <div className="form-group">

                    <div className="col-sm-6">
                        <Food label="Are you a food nerd?"/>
                    </div>
                    <div className="col-sm-6">
                        <Health label="Your most important medical care"/>
                    </div>
                </div>

                <Button label="Check out!"/>
            </form>
        )
    }

});

module.exports = Form;
