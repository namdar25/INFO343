import React, { Component } from 'react';

export default class Carousel extends Component {
    render() {
        return (
            <div>
                <div className="carousel-item active">
                    <img className="d-block img-fluid" src={this.props.images} alt="First slide" />
                </div>
                {/* {Object.keys(this.props.imgs).map((key, i) => {
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
                } */}
            </div>
        )
    }
}