import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import React from 'react';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.latlng = [
            [-52.92457580566406, -78.88664245605469],
            [-52.92457580566406, -78.88389587402344],
            [-52.92320251464844, -78.88664245605469],
            [-52.92320251464844, -78.88526916503906],
            [-52.92320251464844, -78.88389587402344],
            [-52.92594909667969, -78.88664245605469],
            [-52.92594909667969, -78.88526916503906],
            [-52.92594909667969, -78.88389587402344]
    ]
    }
    handleClickOnMarker(marker) {
        alert(JSON.stringify(marker))
    }
    render() {
        let that = this;
        return(
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: this.latlng[0][0], lng: this.latlng[0][1] }}
            >
                {this.props.isMarkerShown && 
                    that.latlng.map(function(item, key) {
                        return <Marker key={key} onClick={that.handleClickOnMarker.bind(that)} position={{ lat: item[0], lng: item[1] }} />
                    })
                }
            </GoogleMap>
        );
    }
}
export default withScriptjs(withGoogleMap(Map));