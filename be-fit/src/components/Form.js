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

    getInitialState: function () {
        return {
            type: 'info',
            message: '',
            activity: null
        };
    },

    handleSubmit: function (event) {
        event.preventDefault();
        document.getElementById('map').scrollIntoView({behavior: "smooth"});
        this.setState({type: 'info', message: 'Sending...'}, this.sendFormData);

        console.log('send form');
    },

    handleActivitySelect: function (value) {
        console.log(value);
        this.setState({
            activity: value
        });
    },

    handleOutdoorIndoorSelect: function (value) {
        console.log(value);
        this.setState({
            outdoor: value
        });
    },

    handleFoodSelect: function (value) {
        console.log(value);
        this.setState({
            food: value
        });
    },

    handleHealthSelect: function (value) {
        console.log(value);
        this.setState({
            health: value
        });
    },

    sendFormData: function () {
        // Fetch form values.
        /*var formData = {
         activity: this.state.activity
         };

         console.log(formData);*/

      /*  fetch('http://192.168.194.48:5050/1210/recommended_locations', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })*/

        /* componentDidUpdate(prevProps, prevState) {
         // only update if the data has changed
         if (prevProps.data !== this.props.data) {
         this.handleSubmit = load({
         data: this.props.data
         });
         }
         },*/
        //make an ajax request here to call the api
        //use componentDidUpdate function to make sure the updated
        //api changes are reflected, either here or in the parent component.
        //that's the ideal workflow
    },
    render: function () {
        return (
            <form method="post" onSubmit={this.handleSubmit} className="highlight">
                <h2>Search for places that fit you best in Berlin</h2>

                <div className="form-group">
                    <div className="col-sm-6">
                        <OutdoorIndoor label="How crazy are you about the outdoors?"
                                       onSelect={this.handleOutdoorIndoorSelect}/>

                    </div>
                    <div className="col-sm-6">
                        <Activities label="What are your favorite sports?" onSelect={this.handleActivitySelect}/>

                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-6">
                        <Food label="Are you a foodie?" onSelect={this.handleFoodSelect}/>
                    </div>
                    <div className="col-sm-6">
                        <Health label="What aspect of your health is important for you" onSelect={this.handleHealthSelect}/>
                    </div>
                </div>

                <Button label="Check out!"/>
            </form>
        )
    }

});

module.exports = Form;
