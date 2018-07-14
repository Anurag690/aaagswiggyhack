import React from 'react'
import PropTypes from 'prop-types';

import MyMapComponent from './map';


const Picker = ({ value, onChange, options }) => (
  <div style={{display: 'flex', flexDirection: 'row', width: '80%'}}>
    <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `620px`, flex: 1 }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
