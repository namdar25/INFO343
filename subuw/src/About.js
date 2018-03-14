
import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import './About.css';

export class About extends Component {
    render() {
        return (
			<div className="profileBackground">
				<div className="profileCard">
					<div className="aboutContainer about">
						<div className= "about">
							<div className="card aboutHeader">
								<h1>About SubUW</h1>
								<p>SubUW is a an easy way for students, individuals, or groups to find a safe place to sublease. Currently, there is not an application that focused for subleasing needs. NOW there is! </p>
							</div>
							<div className="card aboutHeader">
								<h1>About Us</h1>
							</div>
						</div>
						<div className="inputContainer">
							<div className="card-item">
								<div className="card" >
									<img className="card-img-top" src={require("./imgs/raffi.jpg")} alt="Card image cap" />
									<div className="card-body">
										<h5 className="card-title">Raffi Gharakhanian</h5>
										<p className="card-text">Experienced Marketing Analytics Consultant with a demonstrated history of working in the hospital
											and health care industry and flash memory. Skilled in R Programming, Web Development, Tableau, Data Analytics,
											and Microsoft Office . Strong analytics professional pursuing a Bachelor’s Degree in Economics and minors in
											Informatics and Political Science from University of Washington in Seattle.</p>
										<a href="https://www.linkedin.com/in/rgharakhanian/" className="btn btn-primary">LinkedIn</a>
									</div>
								</div>
							</div>
							<div className="card-item">
								<div className="card" >
									<img className="card-img-top" src={require("./imgs/jon.jpg")} alt="Card image cap" />
									<div className="card-body">
										<h5 className="card-title">Jon Cantle</h5>
										<p className="card-text">I am a current Junior at the University of Washington. I pride myself on honesty and strong morals.
											I have an interest in data analysis and visualization. Both my interpersonal and programming skills combined make me a
											great candidate to connect the technical world with the real world. Experience in Data Structures & Algorithms and Front End Web
											Development</p>
										<a href="https://www.linkedin.com/in/jonathon-cantle-7452aa132/" className="btn btn-primary">LinkedIn</a>
									</div>
								</div>
							</div>
							<div className="card-item">
								<div className="card" >
									<img className="card-img-top" src={require("./imgs/lee.png")} alt="Card image cap" />
									<div className="card-body">
										<h5 className="card-title">Lee Segal</h5>
										<p className="card-text">Senior in the Informatics program with a focus in Cyber-Security. After graduation will be working at Starbucks full time.
										Currently taking INFO 343 learning client-side development.</p>
										<a href="https://www.linkedin.com/in/lee-segal/" className="btn btn-primary">LinkedIn</a>
									</div>
								</div>
							</div>
						<div className="card-item">
							<div className="card" >
								<img className="card-img-top" src={require("./imgs/shawn.jpg")} alt="Card image cap" />
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
