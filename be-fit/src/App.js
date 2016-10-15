import React, { Component } from 'react';

import Map from './Map';


/*import logo from './logo.svg';
import './App.css';

import { Map, TileLayer } from 'react-leaflet'
const position = [51.0, -0.09]*/

/*export class App extends React.Component {
  constructor(props) {
    super(props)
  }

render() {
    return (
      <div>
        <Map
          style={{height: "100vh"}}
          center={position}
          zoom={10}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mevrgior/ciubbzfy2005a2iod1ptv4er8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWV2cmdpb3IiLCJhIjoiUzBjTENPUSJ9.rl0EEFMb7iNt4MZqWsA90w"
            attribution="<attribution>" />
        </Map>
      </div>
    )
  }
}*/

class App extends Component {
  render() {
    return <Map />;
  }


  /*constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to out Be-Fit App</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      
        <Map
          style={{height: "100vh"}}
          center={position}
          zoom={10}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mevrgior/ciubbzfy2005a2iod1ptv4er8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWV2cmdpb3IiLCJhIjoiUzBjTENPUSJ9.rl0EEFMb7iNt4MZqWsA90w"
            attribution="<attribution>" />
        </Map>
      </div>
    );
  }*/
}

export default App;