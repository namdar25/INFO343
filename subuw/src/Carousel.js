import React, { Component } from 'react';


//Renders a carousel of images that the user lists for each listing
export default class Carousel extends Component {
    render() {
        return (
            <div>
                {this.props.images &&
                    Object.keys(this.props.images).map((key, i) => {
                        if (i === 0) {
                            return (
                                <div className="carousel-item active">
                                    <img className="d-block img-fluid" src={this.props.images[key]} alt="First slide" />
                                </div>
                            )
                        } else {
                            return (
                                <div className="carousel-item">
                                    <img className="d-block img-fluid" src={this.props.images[key]} alt={(i + 1) + " slide"} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}