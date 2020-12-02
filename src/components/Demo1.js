import React, { Component } from "react";
import { GoogleApiWrapper, Marker, Map } from "google-maps-react"


const mapStyles = {
  width: '70%',
  height: '50%'
};

class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    console.log(this.props)
    return (
    <div>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{
            lat: this.props.pickUpLat,
            lng: this.props.pickUpLong
          }}
        >
        <Marker
          onClick={this.onMarkerClick}
          name={'pick up test'}
          position={{lat: this.props.pickUpLat, lng: this.props.pickUpLong}} 
        />
        <Marker />
        <Marker
          name={'drop off test'}
          position={{lat: this.props.dropOffLat, lng: this.props.dropOffLong}} />
        <Marker />
        </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(Demo1);