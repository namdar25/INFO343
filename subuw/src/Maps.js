import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import GitHubForkRibbon from "react-github-fork-ribbon";
import test from './testlisting.json';


const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDOMxiv80oiceTHg7NerU2705RKh13ryY8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 47.6062095, lng: -122.3320708 }}>
        {test.map((d) => {
            return (
                <Marker position={{ lat: d.lat, lng: d.lng }} />
            )
        })
        }
    </GoogleMap>
));

const enhance = _.identity;

const ReactGoogleMaps = () => [
    <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);