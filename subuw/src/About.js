
import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import './About.css';

export class About extends Component {
    render() {
        return (
            <div className="about">
                <Container>
                    <Row>
                        <Col>
                            <h1>About SubUW</h1>
                            <p>SubUW is a an easy way for students, individuals, or groups to find a safe place to sublease. Currently, there is not an application that focused for subleasing needs. NOW there is! </p>
                        </Col>
                    </Row>
                    <h1>About Us</h1>
                    <Row>
                        <Col>
                            <div className="card" >
                                <img className="card-img-top" src={require("./imgs/lee.png")} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Lee Segal</h5>
                                    <p className="card-text">Senior in the Informatics program with a focus in Cyber-Security. After graduation will be working at Starbucks full time. Currently taking INFO 343 learning client-side development.</p>
                                    <a href="https://www.linkedin.com/in/lee-segal/" className="btn btn-primary">LinkedIn</a>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="card" >
                                <img className="card-img-top" src={require("./imgs/raffi.jpg")} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Raffi Gharakhanian</h5>
                                    <p className="card-text">ENTER YOUR INFO HERE</p>
                                    <a href="#" className="btn btn-primary">LinkedIn</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="card" >
                                <img className="card-img-top" src={require("./imgs/jon.jpg")} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Jon Cantle</h5>
                                    <p className="card-text">ENTER YOUR INFO HERE</p>
                                    <a href="#" className="btn btn-primary">LinkedIn</a>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="card" >
                                <img className="card-img-top" src={require("./imgs/shawn.jpg")} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">Shawn Namdar</h5>
                                    <p className="card-text">eNTER YOUR INFO HERE</p>
                                    <a href="#" className="btn btn-primary">LinkedIn</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

// export class About extends Component {
//     render() {
//         return (
//             <div className="about">
//                 <section className="team">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-md-10 col-md-offset-1">
//                                 <div className="col-lg-12">
//                                     <h6 className="description">OUR TEAM</h6>
//                                     <div className="row pt-md">
//                                         <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
//                                             <div className="img-box">
//                                                 {/* <img src="http://nabeel.co.in/files/bootsnipp/team/1.jpg" className="img-responsive"> */}
//                                                 <ul className="text-center">
//                                                     <a href="#"><li><i className="fa fa-facebook"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-twitter"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
//                                                 </ul>
//                                             </div>
//                                             <h1>Marrie Doi</h1>
//                                             <h2>Co-founder/ Operations</h2>
//                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                                         </div>
//                                         <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
//                                             <div className="img-box">
//                                                 {/* <img src="http://nabeel.co.in/files/bootsnipp/team/2.jpg" className="img-responsive"> */}
//                                                 <ul className="text-center">
//                                                     <a href="#"><li><i className="fa fa-facebook"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-twitter"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
//                                                 </ul>
//                                             </div>
//                                             <h1>Christopher Di</h1>
//                                             <h2>Co-founder/ Projects</h2>
//                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                                         </div>
//                                         <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
//                                             <div className="img-box">
//                                                 {/* <img src="http://nabeel.co.in/files/bootsnipp/team/2.jpg" className="img-responsive"> */}
//                                                 <ul className="text-center">
//                                                     <a href="#"><li><i className="fa fa-facebook"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-twitter"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
//                                                 </ul>
//                                             </div>
//                                             <h1>Christopher Di</h1>
//                                             <h2>Co-founder/ Projects</h2>
//                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                                         </div>
//                                         <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 profile">
//                                             <div className="img-box">
//                                                 {/* <img src="http://nabeel.co.in/files/bootsnipp/team/3.jpg" className="img-responsive"> */}
//                                                 <ul className="text-center">
//                                                     <a href="#"><li><i className="fa fa-facebook"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-twitter"></i></li></a>
//                                                     <a href="#"><li><i className="fa fa-linkedin"></i></li></a>
//                                                 </ul>
//                                             </div>
//                                             <h1>Heather H</h1>
//                                             <h2>Co-founder/ Marketing</h2>
//                                             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <footer>
//                     <div className="container">
//                         <div className="col-md-10 col-md-offset-1 text-center">

//                             <h6>Coded with <i className="fa fa-heart red"></i> by <a href="http://www.nabeel.co.in" target="_blank">Nabeel Kondotty</a></h6>
//                         </div>
//                     </div>
//                 </footer>
//             </div>
//         )
//     }
// }

