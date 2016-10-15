import React from 'react';
import Select from 'react-select';

const ACTIVITIES = [
    {value: '0', label: 'Yoga like Yoda'},
    {value: '1', label: 'Crazy about crossfit'},
    {value: '2', label: "I'm a muscle man/woman"},
    {value: '3', label: 'Call me spider'},
    {value: 'western-4', label: "I've got gills"}
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
    toggleCheckbox (e) {
        let newState = {};
        newState[e.target.name] = e.target.checked;
        this.setState(newState)
    },
    render () {
        var options = ACTIVITIES;
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable}
                        name="selected-state" disabled={this.state.disabled} value={this.state.selectValue}
                        onChange={this.updateValue}/>

            </div>
        );
    }

});


module.exports = ActivitiesField;