
import React, { Component } from 'react';

// export class About extends Component {
//     render() {
//         return (
//             <div> TEST </div>
//         )
//     }
// }

export class About extends Component {
    render() {
        return (
            <div>
                <section className="team">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="col-lg-12">
                                    <h6 className="description">OUR TEAM</h6>
                                    <div className="row pt-md">
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
                                            <div className="img-box">
                                                {/* <img src="http://nabeel.co.in/files/bootsnipp/team/1.jpg" className="img-responsive"> */}
                                                <ul className="text-center">
                                                    <a href="#"><li><i className="fa fa-facebook"></i></li></a>
                                                    <a href="#"><li><i className="fa fa-twitter"></i></li></a>
                                                    <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
                                                </ul>
                                            </div>
                                            <h1>Marrie Doi</h1>
                                            <h2>Co-founder/ Operations</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
                                            <div className="img-box">
                                                {/* <img src="http://nabeel.co.in/files/bootsnipp/team/2.jpg" className="img-responsive"> */}
                                                <ul className="text-center">
                                                    <a href="#"><li><i className="fa fa-facebook"></i></li></a>
                                                    <a href="#"><li><i className="fa fa-twitter"></i></li></a>
                                                    <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
                                                </ul>
                                            </div>
                                            <h1>Christopher Di</h1>
                                            <h2>Co-founder/ Projects</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
                                            <div className="img-box">
                                                {/* <img src="http://nabeel.co.in/files/bootsnipp/team/3.jpg" className="img-responsive"> */}
                                                <ul className="text-center">
                                                    <a href="#"><li><i className="fa fa-facebook"></i></li></a>
                                                    <a href="#"><li><i className="fa fa-twitter"></i></li></a>
                                                    <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
                                                </ul>
                                            </div>
                                            <h1>Heather H</h1>
                                            <h2>Co-founder/ Marketing</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="container">
                        <div className="col-md-10 col-md-offset-1 text-center">

                            <h6>Coded with <i className="fa fa-heart red"></i> by <a href="http://www.nabeel.co.in" target="_blank">Nabeel Kondotty</a></h6>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

