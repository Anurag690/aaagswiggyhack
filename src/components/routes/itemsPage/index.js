import React, { Component } from "react";

import CustomMapper from "./customMap/index";
import CustomPlacer from "./customPlacer/index";

import "./styles.css";

class ItemsPage extends Component {
  render() {
    return (
      <div className="hide-scrollbar-from-window item-page-container">
        {/* <Picker /> */}
        <CustomMapper
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `620px`, flex: 1 }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        
        <CustomPlacer />
      </div>
    );
  }
}

export default ItemsPage;
