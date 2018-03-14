import React, { Component } from 'react';
import firebase from 'firebase'
import { EditProfile } from './EditProfile';
import { EditListing } from './EditListing';
import { Listing } from './Listing';

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            authUser: null,
            user: null,
            userListings: null,
            likedListings: null
        };
    }

    componentDidMount() {
        let authUser = firebase.auth().currentUser;
        if (authUser != null) {
            this.userRef = firebase.database().ref('Users/' + authUser.uid);
            this.userRef.on('value', (snapshot) => {
                let user = snapshot.val();
                this.setState({ user: user });
                this.setState({ authUser: authUser });
            })


            this.uLRef = firebase.database().ref('Listings/');
            this.uLRef.on('value', (snapshot) => {
                let userListings = snapshot.val();
                if (userListings != null) {
                    let userListingKeys = Object.keys(userListings);
                    userListings = Object.values(userListings);
                    userListings = userListings.map((d, i) => {
                        let id = userListingKeys[i]
                        userListings[i].lid = id
                        return userListings[i];
                    })
                    userListings = userListings.filter(listing => listing.uid === authUser.uid);
                    this.setState({ userListings: userListings })
                }

            })
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {

        if (this.state.user != null) {
            let listings = this.state.userListings;
            let userListingsList = null;
            if (this.state.userListings != null) {
                console.log(this.state.userListings);
                userListingsList = this.state.userListings === null ? [] : Object.keys
                    (this.state.userListings).map((x) => {
                        console.log(userListingsList);
                        let userListing = listings[x];
                        userListing.key = x;
                        return userListing;
                    });
            }
            return (
                <div className="profileBackground">
                    <div className="profileCard">
                        <div className="editProfile">
                            <EditProfile user={this.state.user} listings={this.state.userListings} />
                        </div>
                        <div className="editListings">
                            <h3 id="listingHeader"> Your Listings </h3>
                            {this.state.userListings != null &&

                                userListingsList.map((d, i) => {
                                    return <EditListing key={i} listing={d} uid={this.state.authUser.uid} />
                                })
                            }
                            {this.state.userListings == null &&
                                <h3> Post A Sublease! </h3>
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Login to view your profile</h3>
                </div>
            )
        }
    }

}

export default Profile