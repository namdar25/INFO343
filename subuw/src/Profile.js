import React, { Component } from 'react';
import firebase from 'firebase'
import {EditProfile} from './EditProfile';
import {EditListing} from './EditListing';
import {Listing} from './Listing';

export class Profile extends Component {
constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
		this.state = {
		authUser: null,
		user: null,
		userListings:null,
		likedListings:null
        };
    }

	componentDidMount() {
		let authUser = firebase.auth().currentUser;
		if(authUser != null){
			this.userRef = firebase.database().ref('Users/' + authUser.uid);
			this.userRef.on('value', (snapshot) => {
				let user = snapshot.val();
				console.log(user);
				this.setState({ user: user });
				this.setState({ authUser: authUser });
			})

			
			this.uLRef = firebase.database().ref('Listings/');
			this.uLRef.on('value', (snapshot) => {	
				let userListings = snapshot.val();
				userListings = Object.values(userListings);
				userListings = userListings.filter(listing => listing.uid === authUser.uid);
				this.setState({ userListings: userListings })
				
			})
			
			/*this.lLRef = firebase.database().ref('Users/' + authUser.uid +'/LikedListings/');
			this.lLRef.on('value', (snapshot) => {
				let likedListings = snapshot.val();
				this.setState({likedListings:likedListings})
			})*/
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
			/*let likedListingsList = null;
			if (this.state.likedListings != null) {
				console.log(this.state.likedListings);
				likedListingsList = this.state.likedListings === null ? [] : Object.keys
					(this.state.likedListings).map((x) => {
						let likedListing = likedListingsList[x];
						likedListing.key = x;
						return likedListing;
					});
			}*/
			return (
				<div>
					{console.log(this.state.user.userID)}
					<EditProfile user={this.state.user}/>
					<div>
						{this.state.userListings != null &&
							userListingsList.map((d, i) => {
							return <EditListing key={i} listing={d} uid={this.state.authUser.uid}/>
							})
						}
						{this.state.userListings == null &&
								<p> Post A Sublease! </p>
						}
					</div>		
					{/*<div>
						{this.state.likedListings &&
							likedListingsList.map((d, i) => {
								return <AddListing key={i} listings={d} />
							})
						}
						{!this.state.likedListings &&
								<p> Post A Sublease! </p>
						}
					</div>*/}
				</div>
			)
		} else {
			return (
				<div>
				<p>Login</p>
				</div>
			)
		}
	}

}

export default Profile