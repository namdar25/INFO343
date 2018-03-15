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
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: 47.655548, lng: -122.303200 }}>
        {/* {props.listings.map((d, i) => {
            return (
                <Marker position={{ lat: d.lat, lng: d.long }} onClick={props.onToggleOpen} name={i}>
                    {props.isOpen &&
                        <InfoWindow><p>{i + 1}</p></InfoWindow>
                    }
                </Marker>
            )
        })
        } */}
        <Marker position={{ lat: props.listings.lat, lng: props.listings.long }} />
    </GoogleMap>
));

export default class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            center: {}
        }
    }

    render() {
        return (
            <MyMapComponent key="map" googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOMxiv80oiceTHg7NerU2705RKh13ryY8&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                listings={this.props.listings}
                toggle={this.props.toggle} />
        )
    }
}
