import React, { Component } from 'react';
import {EditProfile} from './EditProfile';
import {EditListing} from './EditListing';
import {Listing} from './Listing';

export default class Profile extends Component {
constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
		user = test,
		userListings = testUL,
		likedListings = testLL
        };
    }

	componentDidMount() {
		let authUser = firebase.auth().currentUser;
		this.setState({
			authUser:authUser
		})
		if(this.state.user != null){
			this.userRef = firebase.database().ref('Users/' + this.state.authUser.UID);
			this.userRef.on('value', (snapshot) => {
				let user = snapshot.val();
				this.setState({posts:posts})
			})
			this.uLRef = firebase.database().ref('Listings/');
			this.uLRef.on('value', (snapshot) => {
				let userListings = snapshot.val();
				this.setState({userListings:userListings})
			})
			this.lLRef = firebase.database().ref('Posts');
			this.lLRef.on('value', (snapshot) => {
				let likedListings = snapshot.val();
				this.setState({likedListings:likedListings})
			})
		}
	}

	render() {

		if(this.state.user != null){
			let userListingsList = this.state.userListings === null ? [] : Object.keys
			(this.state.likedListings).map((x) => {
				let userListing = userListingsList[x];
				userListing.key = x;
				return userListing;
				});

			let likedListingsList = this.state.likedListings === null ? [] : Object.keys
			(this.state.likedListings).map((x) => {
				let likedListing = likedListingsList[x];
				likedListing.key = x;
				return likedListing;
				});

			return (
				<div>
					<EditProfile user={this.state.user}/>
					<div>
						{likedListingsList.map((d,i) => {
							return<EditListing key={i} listings={d}/>
							})
						}
					</div>
					<div>			
						{likedListingsList.map((d,i) => {
							return<Listing key={i} listings={d}/>
							})
						}
					</div>
				</div>
			)
		} else {
			return (
				<div>
					<EditProfile user={this.state.user}/>
					<div>
						{userListingsList.map((d,i) => {
							return<EditListing key={i} listings={d}/>
							})
						}
					</div>
					<div>			
						{likedListingsList.map((d,i) => {
							return<Listing key={i} listings={d}/>
							})
						}
					</div>
				</div>
			)
		}
	}

}