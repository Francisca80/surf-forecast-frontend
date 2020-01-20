import React, { Component } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import { Beachbreak} from "../models/beachbreak";
import {mapboxToken} from "../constants"

export class Map extends Component {
  state = {
    viewport: { longitude: 0, latitude: 0, zoom: 14 }
  };

  render() {
    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        width="40vw"
        height="40vh"
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxApiAccessToken= {mapboxToken}
          
    
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {/* <Marker>
         
      </Marker> */}
      </ReactMapGL>
    );
  }
}

export default Map;
