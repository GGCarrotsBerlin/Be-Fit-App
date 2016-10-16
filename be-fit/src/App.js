import React, { Component } from 'react';
import logo from './sun_yoga.png';
import './App.css';
import Map from './Map';

import Form from './components/Form';


class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>be<span className="uppercase">Fit</span> where you live</h1>
                    <div className="container">
                        <Form/>
                    </div>
                </div>

                <div className="App-body">
                    <div className="container">
                        <Map />
                    </div>
                </div>
                <div className="App-footer">
                </div>
            </div>
        );
    }
}

export default App;
