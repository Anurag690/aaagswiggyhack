import React, { Component } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { connect } from "react-redux";
import ngeohash from "ngeohash";

import _ from "lodash";

class CustomMapper extends Component {
  render() {
    const defaultCenterValueObj = {
      lat: "",
      lng: ""
    };
    const itemsArr = _.get(this.props.selectedCategoryObj, "itemsArr", []);
    if (itemsArr.length) {
      const latlon123 = ngeohash.decode(itemsArr[0].geohash);
      defaultCenterValueObj.lat = latlon123.latitude;
      defaultCenterValueObj.lng = latlon123.longitude;
    }
    return (
      <div>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{
            lat: defaultCenterValueObj.lat,
            lng: defaultCenterValueObj.lng
          }}
        >
          {itemsArr.length &&
            itemsArr.map((itemObj, key) => {
              const latlon = ngeohash.decode(itemObj.geohash);
              return (
                <Marker
                  key={key}
                  position={{ lat: latlon.latitude, lng: latlon.longitude }}
                />
              );
            })}
        </GoogleMap>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCategoryObj: _.get(state.mainPageReducer, "selectedCategoryObj", {})
  };
}

const mapDispatchToProps = dispatch => ({
  //   updateFormData: formData =>
  //     dispatch(mainPageActions.updateFormData(formData)),
  //   updateGeoLocationValidation: geoLocationObj =>
  //     dispatch(mainPageActions.updateGeoLocationValidation(geoLocationObj)),
  //   fetchCategoryDataFromServer: requestPayload =>
  //     dispatch(mainPageActions.fetchCategoryDataFromServer(requestPayload))
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withScriptjs(withGoogleMap(CustomMapper)));
export default withScriptjs(
  withGoogleMap(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(CustomMapper)
  )
);
