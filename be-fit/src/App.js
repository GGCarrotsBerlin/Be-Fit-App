import React, { Component } from 'react';
import logo from './sun_yoga.jpg';
import './App.css';
import Map from './Map';
import Activities from './components/Activities';
import OutdoorIndoor from './components/OutdoorIndoor';
import Food from './components/Food';
import Health from './components/Health';

class App extends Component {
    constructor() {
        super();
        this.state = {txt: 'this is the state text'}
    }

    update(e) {
        this.setState({txt: e.target.value})
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <h2>Be-Fit where you live</h2>
                </div>

                <h2>Search for a place fits you best in your city</h2>

                <p>Have a try! How fit are you? How fit is your city? Where can you do your favourite Sport and get the
                    yummiest food?</p>

                <div className="container">
                    <div className="form-group">
                        <div className="col-sm-6">
                            <Activities label="What is your favorite sports?"/>
                        </div>
                        <div className="col-sm-6">
                            <OutdoorIndoor label="How crazy are you about outdoor?"/>
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

                </div>
                <div className="container">
                    <Map />
                </div>

            </div>


        );
    }
}

export default App;
