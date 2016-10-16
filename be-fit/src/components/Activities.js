import React from 'react';
import Select from 'react-select';

const ACTIVITIES = [
    {value: '0', label: 'Yoga like Yoda'},
    {value: '1', label: 'Crazy about crossfit'},
    {value: '2', label: "I'm a muscle man/woman"},
    {value: '3', label: 'Call me spider'}
];

var ActivitiesField = React.createClass({
    displayName: 'ActivitiesField',
    propTypes: {
        label: React.PropTypes.string,
        searchable: React.PropTypes.bool,

    },
    getDefaultProps () {
        return {
            label: 'What is your favorite sports?'
        };
    },
    getInitialState () {
        return {
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true
        };
    },

    updateValue (newValue) {
        console.log('State changed to ' + newValue);
        this.setState({
            selectValue: newValue
        });
    },
    render () {
        var options = ACTIVITIES;
        return (
            <div className="section">
                <label className="select-label">{this.props.label}</label>
                <Select ref="activitiesSelect" autofocus options={options} simpleValue clearable={this.state.clearable}
                        name="selected-activity" disabled={this.state.disabled} value={this.state.selectValue}
                        onChange={this.props.handleSelect}/>

            </div>
        );
    }

});


module.exports = ActivitiesField;
