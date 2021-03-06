import React, { Component } from 'react';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import './Map.css';

export class Map extends Component {
  state = {
    viewport: { longitude: -122.45, latitude: 37.78, zoom: 14 }
  }

  render() {
    const { viewport } = this.state; 

    return (

      <div className="map-wrapper">
        <ReactMapGL {...viewport}
          width="50vw"
          height="50vh"
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          mapboxApiAccessToken={"pk.eyJ1IjoiZnJhbmNpc2NhODB2bSIsImEiOiJjazVjZnp3eTExNmowM2xwa3pieGJ1cDRpIn0.dXkJ6CzxbkcrqWK0Ij7xYA"}

          onViewportChange={viewport => this.setState({ viewport })}>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
        </ReactMapGL>
      </div>
    );
  }

}

export default Map;
