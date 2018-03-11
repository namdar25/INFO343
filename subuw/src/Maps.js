import _ from "lodash";
import React, { Component } from 'react';
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
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}>
        {props.listings.map((d) => {
            return (
                <Marker position={{ lat: d.lat, lng: d.long }} />
            )
        })
        }
    </GoogleMap>
));

const enhance = _.identity;


export default class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {}
        }
        this.getLatLong.bind(this)
    }

    getLatLong() {
        let baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        let apiKey = "AIzaSyDOMxiv80oiceTHg7NerU2705RKh13ryY8";
        let zip = "98105";
        let url = baseURL + zip + '&key=' + apiKey;
        fetch(url).then(function (response) {
            return response.json()
        }).then((result) => {
            this.setState({
                center: { lat: result.results[0].geometry.location.lat, lng: result.results[0].geometry.location.lng }
            })
        })
    }

    render() {
        this.getLatLong()
        return (
            <MyMapComponent key="map" listings={this.props.listings} center={this.state.center} />
        )
    }
}
