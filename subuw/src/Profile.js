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

	render() {
		return (
			<div>
				<EditProfile user={this.state.user}/>
				<div>
					{this.state.userListings.map((d) => {
						return <EditListing listings={d} />
					})
					}
				</div>
				<div>
					{this.state.likedListings.map((d) => {
						return <Listing listings={d} />
					})
					}
				</div>
			</div>
		)
	}

}