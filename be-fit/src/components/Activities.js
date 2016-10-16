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
            label: 'Sport'
        };
    },
    getInitialState () {
        return {
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true
        };
    },
    render () {
        var options = ACTIVITIES;
        return (
            <div className="section">
                <label className="select-label">{this.props.label}</label>
                <Select ref="activitiesSelect" autofocus options={options} simpleValue clearable={this.state.clearable}
                        name={this.props.label} disabled={this.state.disabled} value={this.state.selectValue}
                        onChange={this.props.onSelect}/>

            </div>
        );
    }

});


module.exports = ActivitiesField;
