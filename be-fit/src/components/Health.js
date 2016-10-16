import React from 'react';
import Select from 'react-select';

const HEALTH = [
    { value: '0', label: 'My skin is my castle'},
    { value: '1', label: "I'm so sporty, I need an orthopedic on speed dial"},
    { value: '2', label: "I know homeopathy is placebo but as long as it works..."}
];

var HealthField = React.createClass({
    displayName: 'HealthField',
    propTypes: {
        label: React.PropTypes.string
    },
    getDefaultProps () {
        return {
            label: 'Your most important medical care'
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
        var options = HEALTH;
        return (
            <div className="section">
                <label className="select-label">{this.props.label}</label>
                <Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable}
                        name="selected-state" disabled={this.state.disabled} value={this.state.selectValue}
                        onChange={this.props.onSelect}/>

            </div>
        );
    }
    
});


module.exports = HealthField;