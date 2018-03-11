import React, { Component } from 'react';
import ImageUploader from 'react-image-upload';

export default class EditProfile extends Component {
	constructor(props) {
        super(props)
		this.editProfile = this.editProfile.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
			displayName : '',
			photo: '',
            email: '',
            phoneNumber: '',
			userID : ''
        };

    }

	componentDidMount() {
	this.setState(
		displayName : this.props.user.displayName,
		photo: this.props.user.photo,
        email: this.props.user.email,
        phoneNumber: this.props.user.phoneNumber,
		userID : this.props.user.userID
		)
	}

    handleChange(propertyName, event) {
        var change = {};
        change[propertyName] = event.target.value;
        this.setState(change)
    }

    editProfile(event) {
        event.preventDefault();
		let displayName = this.state.displayName;
		let photo = this.state.photo;
        let email = this.state.city;
        let phoneNumber = this.state.phoneNumber;
		let userID = this.state.userID

        let profileRef = firebase.database().ref('Users/ + userID');
        profileRef.set({
            displayName : displayName,
			photo: photo,
            email: email,
            phoneNumber: phoneNumber,
			userID : userID
		}).catch(err => {
			this.setState({ errorMessage: err.message })
		});
	}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }



    render() {
        return (
            <div>
                <div className="card card-inverse" onClick={this.toggle}>
                    <img className="card-img" src={this.props.user.image} alt="Profile Picture" />
                    <div className="card-img-overlay" id='profile-card'>
                        <h4 className="card-title">{this.props.user.displayName}</h4>
                        <p className="card-text">{this.props.user.email}</p>
						<p className="card-text">{this.props.user.phoneNumber}</p>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false} >
                    <ModalBody>
                        <div>
                            <div className="card card-inverse" onClick={this.toggle}>
								<img className="card-img" src={this.props.user.image} alt="Profile Picture" />
								<div className="card-img-overlay" id='listing-card'>
									<h4 className="card-title">{"$" + this.props.user.rent + '/mo'}</h4>
									<p className="card-text">{this.props.user.beds + "bd . " + this.props.user.baths + "ba . " + this.props.user.sqft + "sqft"} <br />
										{this.props.user.address + ', ' + this.props.user.city + ', ' + this.props.user.state}
									</p>
								</div>
							</div>
                            <div className='addListing' >
								<form>
									<div className="column">
										< div className="form-group">
											<img className="card-img" src={this.props.user.image} alt="Profile Picture" />
											<label>Profile Picture </label>
											<ImageUploader
												withIcon={true}
												buttonText='Choose Profile Picture'
												onChange={this.handleChange.bind(this, 'photo')}
												imgExtension={['.jpg', '.gif', '.png', '.gif']}
												maxFileSize={5242880}
											/>
										</div>
										< div className="form-group">
											<label>email</label>
											<input type="text" className="form-control" id="email" placeholder={this.props.user.email} onChange={this.handleChange.bind(this, 'email')} />
										</div>
										< div className="form-group">
											<label>Phone Number</label>
											<input type="text" className="form-control" id="phoneNumber" placeholder={this.props.user.phoneNumber} onChange={this.handleChange.bind(this, 'phoneNumber')} />
										</div>
									</div>
									<input onClick={this.addListing} type="submit" value="apply" />
								</form>
							</div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}