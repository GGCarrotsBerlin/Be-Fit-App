import React from 'react';
import Select from 'react-select';

const FOOD = [
    { value: '0', label: 'I prefer veggie'},
    { value: '1', label: 'Vegan level 5. Never eat anything that casts a shadow'},
    { value: '2', label: "Paleo carnivore hipster"},
    { value: '3', label: "I eat everything mummy serves"}
];

var FoodField = React.createClass({
    displayName: 'FoodField',
    propTypes: {
        label: React.PropTypes.string
    },
    getDefaultProps () {
        return {
            label: 'Are you a food nerd?'
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
        var options = FOOD;
        return (
            <div className="section">
                <label className="select-label">{this.props.label}</label>
                <Select ref="stateSelect" autofocus options={options} simpleValue clearable={this.state.clearable}
                        name="selected-state" disabled={this.state.disabled} value={this.state.selectValue}
                        onChange={this.updateValue}/>

            </div>
        );
    }
    
});


module.exports = FoodField;