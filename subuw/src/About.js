
import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';

export class About extends Component {
    render() {
        return (
            <div className="profileBackground">
                <div className="profileCard">
                    <div className="aboutContainer about">
                        <div className="about">
                            <div className="card aboutHeader">
                                <h1>About SubUW</h1>
                                <p>SubUW is a an easy way for students, individuals, or groups to find a safe place to sublease. Currently, there is no other application that focuses on subleasing needs for students. NOW there is!</p>
                            </div>
                            <div className="card aboutHeader">
                                <h1>About Us</h1>
                            </div>
                        </div>
                        <div className="inputContainer">
                            <div className="card-item">
                                <div className="card" >
                                    <img className="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/subuw-j420m.appspot.com/o/imgs%2Fraffi.jpg?alt=media&token=40fb6b7f-68a9-49bb-976d-691273563a12" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Raffi Gharakhanian</h5>
                                        <p className="card-text">Experienced Marketing Analytics Consultant with a demonstrated history of working in the hospital
											and health care industry and flash memory. Skilled in R Programming, Web Development, Tableau, Data Analytics,
											and Microsoft Office. Strong analytics professional pursuing a Bachelor’s Degree in Economics and minors in
											Informatics and Political Science from University of Washington in Seattle.</p>
                                        <a href="https://www.linkedin.com/in/rgharakhanian/" className="btn btn-primary">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-item">
                                <div className="card" >
                                    <img className="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/subuw-j420m.appspot.com/o/imgs%2Fjon.jpg?alt=media&token=b8b551fc-caa0-4b20-a717-7c44945e95e3" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Jon Cantle</h5>
                                        <p className="card-text">I am a current Junior at the University of Washington. I pride myself on honesty and strong morals.
											I have an interest in data analysis and visualization. Both my interpersonal and programming skills combined make me a
											great candidate to connect the technical world with the real world. Experience in Data Structures and Algorithms and Front End Web
											Development. Currently looking for internship opportunities for summer or fall quarter.</p>
                                        <a href="https://www.linkedin.com/in/jonathon-cantle-7452aa132/" className="btn btn-primary">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-item">
                                <div className="card" >
                                    <img className="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/subuw-j420m.appspot.com/o/imgs%2Flee.png?alt=media&token=ad53b62d-f93f-4d78-92a5-303cda99dcc7" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Lee Segal</h5>
                                        <p className="card-text">Senior in the Informatics program with a focus in Cyber-Security. Have worked in many different postitons inlcuding: IT, Identity management Security Team, Configuration Management Team and a Project Manager. I have experience with React, Javascript, Java, SQL, Python, HTML, and CSS. After graduation I will be working on a Identity Mangament Secuirty team.</p>
                                        <a href="https://www.linkedin.com/in/lee-segal/" className="btn btn-primary">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-item">
                                <div className="card" >
                                    <img className="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/subuw-j420m.appspot.com/o/imgs%2FLightroomEdited-2995.jpg?alt=media&token=2f221d4c-3118-4c8e-952e-5a660fa253cf" alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Shawn Namdar</h5>
                                        <p className="card-text">Senior in the informatics and civil engineering programs with extensive professional experience in construction management,
											information technology, web development, and innovation engineering. I have excelled in fraternal leadership positions and plan to utilize my
											unique skillset post-graduation as an innovation engineer at BNBuilders in downtown Seattle.</p>
                                        <a href="https://www.linkedin.com/in/shawnnamdar/" className="btn btn-primary">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
