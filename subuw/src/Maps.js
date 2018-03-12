import _ from "lodash";
import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import GitHubForkRibbon from "react-github-fork-ribbon";
import test from './testlisting.json';
// import MapListing from './MapListing'

const MyMapComponent = compose(
    withStateHandlers(() => ({
        isOpen: false,
        currentMarker: {}
    }), {
            onToggleOpen: ({ isOpen }) => (d) => ({
                isOpen: !isOpen
            })
        }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}>
        {props.listings.map((d, i) => {
            return (
                <Marker position={{ lat: d.lat, lng: d.long }} onClick={props.onToggleOpen} name={i}>
                    {/* {props.isOpen &&
                        <MapListing modal={true} listings={d} />
                    } */}
                </Marker>
            )
        })
        }
    </GoogleMap>
));

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
        let zip = this.props.search
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
            <MyMapComponent key="map" googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                listings={this.props.listings}
                center={this.state.center}
                toggle={this.props.toggle} />
        )
    }
}
