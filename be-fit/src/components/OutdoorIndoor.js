import React from 'react';
import Select from 'react-select';

const OUTDOOR_INDOOR = [
    { value: '0', label: 'Why should I go outside?'},
    { value: '1', label: 'If the sun is shining and birds are flying!'},
    { value: '2', label: "here is no bad weather, only bad clothing"}
];

var OutdoorIndoorField = React.createClass({
    displayName: 'OutdoorIndoorField',
    propTypes: {
        label: React.PropTypes.string
    },
    getDefaultProps () {
        return {
            label: 'How crazy are you about ourdoor?'
        };
    },
    getInitialState () {
        return {
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
        var options = OUTDOOR_INDOOR;
        return (
            <div className="section">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable}
                        name="selected-state" disabled={this.state.disabled} value={this.state.selectValue}
                        onChange={this.updateValue} searchable={this.state.searchable} />

            </div>
        );
    }
    
});


module.exports = OutdoorIndoorField;