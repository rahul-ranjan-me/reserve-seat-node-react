import React, {Component} from 'react';
require('../../scss/header.scss');


export default class Header extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<header className="" id="overview">
				<div className="container">
					<img src="images/IHS-Markit-logo.svg" width="180" />
					<h1>Reserve your seat</h1>
				</div>
			</header>
		)
	}
}

// <img src="images/IHS-Markit-logo.svg" width="180" />
// 					<h1>Reserve your seat</h1>